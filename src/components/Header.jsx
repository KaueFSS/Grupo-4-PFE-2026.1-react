import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import { buscarArtigos } from '../utils/wordpress';
import '../styles/header.css';

const NAV_LINKS = [
  { to: '/',              label: 'Home' },
  { to: '/quem-somos',    label: 'Quem Somos' },
  { to: '/o-que-fazemos', label: 'O que fazemos' },
  { to: '/artigos',       label: 'Artigos' },
  { to: '/contato',       label: 'Contato' },
];

const TEMAS_POPULARES = [
  'Governança Corporativa', 'ESG', 'Conselho de Administração',
  'Compliance', 'Gestão de Riscos', 'Auditoria', 'Carreira', 'Transparência',
];

const ATALHOS_RAPIDOS = [
  { label: 'Todos os artigos', to: '/artigos',       icon: 'fa-newspaper'  },
  { label: 'Quem Somos',       to: '/quem-somos',    icon: 'fa-users'      },
  { label: 'O que fazemos',    to: '/o-que-fazemos', icon: 'fa-briefcase'  },
];

function carregarRecentes() {
  try { return JSON.parse(localStorage.getItem('acb_buscas') || '[]'); }
  catch (_) { return []; }
}
function salvarRecentes(lista) {
  localStorage.setItem('acb_buscas', JSON.stringify(lista.slice(0, 5)));
}

export default function Header() {
  const [menuAberto, setMenuAberto]   = useState(false);
  const [pesquisa, setPesquisa]       = useState('');
  const [sugestoes, setSugestoes]     = useState([]);
  const [carregando, setCarregando]   = useState(false);
  const [focado, setFocado]           = useState(false);
  const [indiceAtivo, setIndiceAtivo] = useState(-1);
  const [scrolled, setScrolled]       = useState(false);
  const [recentes, setRecentes]       = useState(carregarRecentes);
  const searchBoxRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const termoDebounce = useDebounce(pesquisa, 280);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuAberto(false);
    setFocado(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuAberto ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuAberto]);

  useEffect(() => {
    if (!termoDebounce.trim()) {
      setSugestoes([]);
      setCarregando(false);
      return;
    }
    let cancelado = false;
    setCarregando(true);
    buscarArtigos({ busca: termoDebounce, porPagina: 5 })
      .then(({ artigos }) => {
        if (!cancelado) { setSugestoes(artigos); setIndiceAtivo(-1); }
      })
      .catch(() => !cancelado && setSugestoes([]))
      .finally(() => !cancelado && setCarregando(false));
    return () => { cancelado = true; };
  }, [termoDebounce]);

  useEffect(() => {
    function onClickFora(e) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setFocado(false);
      }
    }
    document.addEventListener('mousedown', onClickFora);
    return () => document.removeEventListener('mousedown', onClickFora);
  }, []);

  function irParaPesquisa(termo) {
    const t = (termo ?? pesquisa).trim();
    if (!t) return;
    const novas = [t, ...recentes.filter(r => r !== t)].slice(0, 5);
    setRecentes(novas);
    salvarRecentes(novas);
    setFocado(false);
    navigate('/artigos?q=' + encodeURIComponent(t));
  }

  function removerRecente(termo, e) {
    e.stopPropagation();
    const novas = recentes.filter(r => r !== termo);
    setRecentes(novas);
    salvarRecentes(novas);
  }

  function abrirArtigo(item) {
    setFocado(false);
    setPesquisa('');
    if (item.id) navigate(`/artigos/${item.id}`);
    else navigate('/artigos');
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndiceAtivo(i => Math.min(i + 1, sugestoes.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndiceAtivo(i => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      if (indiceAtivo >= 0 && sugestoes[indiceAtivo]) abrirArtigo(sugestoes[indiceAtivo]);
      else irParaPesquisa();
    } else if (e.key === 'Escape') {
      setFocado(false);
    }
  }

  return (
    <>
      <div className="topbar">
        <div className="topbar-inner">
          <div className="topbar-info">
            <span><i className="fa-solid fa-envelope"></i> contato@acbrasil.org.br</span>
            <span className="topbar-sep">·</span>
            <span><i className="fa-solid fa-phone"></i> (11) 3333-4444</span>
          </div>
          <div className="topbar-redes">
            <a href="https://www.linkedin.com/company/associacao-de-conselheiros-do-brasil/" target="_blank" rel="noopener" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="https://www.youtube.com/@acbrasil" target="_blank" rel="noopener" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
            <a href="https://web.whatsapp.com/" target="_blank" rel="noopener" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
          </div>
        </div>
      </div>

      <header className={scrolled ? 'scrolled' : ''}>
        <div className="header-container">
          <button
            type="button"
            className="header-logo-link"
            aria-label="Página inicial — ACBrasil"
            onClick={() => { setMenuAberto(false); navigate('/'); }}
          >
            <img src="/logo.png" alt="Logo ACBrasil" className="logo"
                 onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
            <span className="logo-texto" style={{ display: 'none' }}>ACBrasil</span>
          </button>

          <nav className="nav-desktop">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={location.pathname === link.to ? 'ativo' : ''}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-acoes">
            <div ref={searchBoxRef} className={`pesquisa-container ${focado ? 'aberto' : ''}`}>
              <i className="fa-solid fa-magnifying-glass pesquisa-icone"></i>
              <input
                type="text"
                placeholder="Pesquisar artigos..."
                className="pesquisa"
                aria-label="Buscar artigos"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                onFocus={() => setFocado(true)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              />
              {pesquisa && (
                <button className="pesquisa-limpar" onClick={() => setPesquisa('')} aria-label="Limpar">✕</button>
              )}

              {focado && (
                <div className="pesquisa-dropdown" role="listbox">
                  {!pesquisa.trim() ? (
                    <>
                      {recentes.length > 0 && (
                        <div className="filtro-secao">
                          <div className="pesquisa-titulo">Pesquisas recentes</div>
                          {recentes.map(r => (
                            <div key={r} className="filtro-recente">
                              <button className="filtro-recente-btn" onClick={() => irParaPesquisa(r)}>
                                <i className="fa-solid fa-clock-rotate-left"></i>
                                {r}
                              </button>
                              <button className="filtro-recente-del" onClick={(e) => removerRecente(r, e)} aria-label="Remover">✕</button>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="filtro-secao">
                        <div className="pesquisa-titulo">Temas populares</div>
                        <div className="filtro-temas">
                          {TEMAS_POPULARES.map(t => (
                            <button key={t} className="filtro-tema-pill" onClick={() => irParaPesquisa(t)}>
                              <i className="fa-solid fa-hashtag"></i> {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="filtro-secao filtro-secao-atalhos">
                        <div className="pesquisa-titulo">Navegar</div>
                        {ATALHOS_RAPIDOS.map(a => (
                          <Link key={a.to} to={a.to} className="filtro-atalho" onClick={() => setFocado(false)}>
                            <i className={`fa-solid ${a.icon}`}></i>
                            {a.label}
                            <i className="fa-solid fa-chevron-right filtro-atalho-arrow"></i>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      {carregando && (
                        <div className="pesquisa-info">
                          <span className="loader-spinner"></span> Procurando…
                        </div>
                      )}
                      {!carregando && sugestoes.length === 0 && (
                        <div className="pesquisa-info">
                          <i className="fa-solid fa-circle-info"></i> Nenhum artigo para "{pesquisa}".
                        </div>
                      )}
                      {!carregando && sugestoes.length > 0 && (
                        <>
                          <div className="pesquisa-titulo">Sugestões</div>
                          {sugestoes.map((s, i) => (
                            <button
                              key={s.id}
                              role="option"
                              className={`pesquisa-item ${i === indiceAtivo ? 'ativo' : ''}`}
                              onMouseEnter={() => setIndiceAtivo(i)}
                              onClick={() => abrirArtigo(s)}
                            >
                              <img src={s.imagem} alt="" loading="lazy"
                                   onError={(e) => e.target.style.visibility = 'hidden'} />
                              <div>
                                <div className="pesquisa-item-titulo">{s.titulo}</div>
                                <div className="pesquisa-item-meta">
                                  <span>{s.categoria}</span><span>·</span><span>{s.data}</span>
                                </div>
                              </div>
                            </button>
                          ))}
                          <button className="pesquisa-ver-todos" onClick={() => irParaPesquisa()}>
                            Ver todos os resultados para "{pesquisa}" <i className="fa-solid fa-arrow-right"></i>
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            <Link to="/associe-se" className="btn-associe">
              <i className="fa-solid fa-handshake"></i>
              <span>Associe-se</span>
            </Link>

            <button
              className="btn-hamburger"
              aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setMenuAberto(!menuAberto)}
            >
              <span className={`bar ${menuAberto ? 'a' : ''}`}></span>
              <span className={`bar ${menuAberto ? 'b' : ''}`}></span>
              <span className={`bar ${menuAberto ? 'c' : ''}`}></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`menu-mobile ${menuAberto ? 'aberto' : ''}`}>
        <div className="menu-mobile-busca">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Pesquisar..."
            aria-label="Pesquisar artigos"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') irParaPesquisa(); }}
          />
        </div>
        <nav className="menu-mobile-nav">
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={location.pathname === link.to ? 'ativo' : ''}
            >
              {link.label}
              <i className="fa-solid fa-chevron-right"></i>
            </Link>
          ))}
        </nav>
        <div className="menu-mobile-rodape">
          <Link to="/associe-se" className="btn-associe">
            <i className="fa-solid fa-handshake"></i> Associe-se à ACBrasil
          </Link>
          <div className="menu-mobile-redes">
            <a href="https://www.linkedin.com/company/associacao-de-conselheiros-do-brasil/" target="_blank" rel="noopener" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="https://www.youtube.com/@acbrasil" target="_blank" rel="noopener" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
            <a href="https://web.whatsapp.com/" target="_blank" rel="noopener" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
          </div>
        </div>
      </div>
      {menuAberto && <div className="menu-backdrop" onClick={() => setMenuAberto(false)}></div>}
    </>
  );
}
