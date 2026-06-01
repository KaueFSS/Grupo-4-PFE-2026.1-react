import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import { buscarArtigos, buscarCategorias } from '../utils/wordpress';
import '../styles/artigos.css';

const ORDENACOES = [
  { value: 'recentes', label: 'Mais recentes' },
  { value: 'antigos',  label: 'Mais antigos'  },
  { value: 'titulo',   label: 'Título (A→Z)'  },
];

export default function Artigos() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [busca, setBusca]           = useState(() => searchParams.get('q') || '');
  const [ordenacao, setOrdenacao]   = useState('recentes');
  const [categoriaAtiva, setCateg]  = useState('');
  const [categorias, setCategorias] = useState([]);
  const [artigos, setArtigos]       = useState([]);
  const [pagina, setPagina]         = useState(1);
  const [totalPaginas, setTotal]    = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [carregandoMais, setMais]   = useState(false);
  const [erro, setErro]             = useState(null);

  const buscaDebounce = useDebounce(busca, 400);
  const sentinelRef   = useRef(null);

  // Guarda o último q= que nós mesmos escrevemos na URL
  // para distinguir navegação interna vs. vinda do header
  const lastSetQ = useRef(searchParams.get('q') || '');

  // Busca categorias da API uma única vez
  useEffect(() => {
    buscarCategorias().then(setCategorias).catch(() => {});
  }, []);

  // Sincroniza o input quando a URL ?q= muda externamente (ex: busca do header)
  useEffect(() => {
    const q = searchParams.get('q') || '';
    if (q !== lastSetQ.current) {
      lastSetQ.current = q;
      setBusca(q);
    }
  }, [searchParams]);

  // Atualiza ?q= na URL após debounce do input
  useEffect(() => {
    lastSetQ.current = buscaDebounce;
    if (buscaDebounce) setSearchParams({ q: buscaDebounce }, { replace: true });
    else               setSearchParams({},                   { replace: true });
  }, [buscaDebounce, setSearchParams]);

  // Refetch sempre que busca, ordenação ou categoria mudar
  useEffect(() => {
    let cancelado = false;
    setCarregando(true);
    setErro(null);
    setArtigos([]);
    setPagina(1);

    buscarArtigos({ pagina: 1, porPagina: 9, busca: buscaDebounce, ordenacao, categoriaId: categoriaAtiva })
      .then(({ artigos: dados, totalPaginas }) => {
        if (cancelado) return;
        setArtigos(dados);
        setTotal(totalPaginas);
      })
      .catch(() => !cancelado && setErro('Não foi possível carregar os artigos.'))
      .finally(() => !cancelado && setCarregando(false));

    return () => { cancelado = true; };
  }, [buscaDebounce, ordenacao, categoriaAtiva]);

  // Carrega próxima página (infinite scroll)
  const carregarMais = useCallback(() => {
    if (carregandoMais || pagina >= totalPaginas || carregando) return;
    setMais(true);
    const proxima = pagina + 1;
    buscarArtigos({ pagina: proxima, porPagina: 9, busca: buscaDebounce, ordenacao, categoriaId: categoriaAtiva })
      .then(({ artigos: novos }) => {
        setArtigos(a => [...a, ...novos]);
        setPagina(proxima);
      })
      .catch(() => {})
      .finally(() => setMais(false));
  }, [pagina, totalPaginas, carregandoMais, carregando, buscaDebounce, ordenacao, categoriaAtiva]);

  // IntersectionObserver para infinite scroll
  useEffect(() => {
    if (!sentinelRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) carregarMais(); },
      { rootMargin: '300px' }
    );
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [carregarMais]);

  const temFiltro = busca || categoriaAtiva;
  const destaque  = !temFiltro && artigos.length > 0 ? artigos[0] : null;
  const lista     = destaque ? artigos.slice(1) : artigos;

  return (
    <>
      {/* Banner */}
      <section className="page-banner">
        <div className="page-banner-conteudo">
          <p className="page-banner-tag"><i className="fa-solid fa-newspaper"></i> Conteúdo</p>
          <h1>Artigos & Publicações</h1>
          <p className="page-banner-sub">Governança corporativa, ESG, carreira e mercado — atualizados em tempo real.</p>
        </div>
      </section>

      {/* Barra de categorias vinda da API */}
      <div className="barra-categorias">
        <div className="barra-categorias-inner">
          <button
            className={`cat-pill ${!categoriaAtiva ? 'ativo' : ''}`}
            onClick={() => setCateg('')}
          >
            Todas
          </button>
          {categorias.map(cat => (
            <button
              key={cat.id}
              className={`cat-pill ${categoriaAtiva === cat.id ? 'ativo' : ''}`}
              onClick={() => setCateg(prev => prev === cat.id ? '' : cat.id)}
            >
              {cat.nome}
            </button>
          ))}
        </div>
      </div>

      <main className="main-artigos">
        {/* Destaque (apenas sem filtros ativos) */}
        {destaque && !carregando && (
          <section className="destaque-container">
            <div className="destaque-imagem">
              <img src={destaque.imagem} alt={destaque.titulo} loading="lazy"
                   onError={(e) => { e.target.src = `https://picsum.photos/seed/${destaque.id}/800/500`; }} />
              <span className="destaque-badge"><i className="fa-solid fa-star"></i> Em destaque</span>
            </div>
            <div className="destaque-conteudo">
              <span className="tag tag-governanca">{destaque.categoria}</span>
              <h2>{destaque.titulo}</h2>
              <p>{destaque.resumo}</p>
              <div className="destaque-meta">
                <span><i className="fa-regular fa-calendar"></i> {destaque.data}</span>
                <span><i className="fa-regular fa-user"></i> {destaque.autor}</span>
                <span><i className="fa-regular fa-clock"></i> {destaque.leitura} de leitura</span>
              </div>
              <a href={destaque.link} target="_blank" rel="noopener" className="btn-ler-mais">
                Ler artigo completo <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </section>
        )}

        {/* Filtros */}
        <div className="filtros-wrapper">
          <div className="filtros-busca">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Buscar artigos por título, autor ou palavra-chave..."
              className="input-filtro"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            {busca && (
              <button className="busca-limpar" onClick={() => setBusca('')} aria-label="Limpar busca">✕</button>
            )}
          </div>
          <div className="filtros-selects">
            <div className="select-wrapper">
              <i className="fa-solid fa-arrow-up-wide-short select-icone"></i>
              <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
                {ORDENACOES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Cabeçalho da listagem */}
        <div className="secao-cabecalho">
          <div className="secao-titulo">
            <h2>{busca ? `Resultados para "${busca}"` : 'Todos os artigos'}</h2>
            <hr />
          </div>
          {!carregando && (
            <span className="artigos-contador">
              {artigos.length} {artigos.length === 1 ? 'artigo' : 'artigos'}
            </span>
          )}
        </div>

        {erro && (
          <div className="estado-erro">
            <i className="fa-solid fa-triangle-exclamation"></i> {erro}
          </div>
        )}

        {/* Grid */}
        <section className="grid-artigos">
          {carregando
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : lista.length === 0 && !destaque
              ? (
                <div className="estado-vazio">
                  <i className="fa-solid fa-folder-open"></i>
                  <strong>Nenhum artigo encontrado</strong>
                  <p>Tente outra palavra-chave ou remova os filtros.</p>
                </div>
              )
              : lista.map(a => <CardArtigo key={a.id} artigo={a} />)
          }
        </section>

        {/* Sentinela infinite scroll */}
        {!carregando && pagina < totalPaginas && (
          <div ref={sentinelRef} className="sentinela">
            {carregandoMais && (
              <div className="loader-inline">
                <span className="loader-spinner-grande"></span> Carregando mais artigos...
              </div>
            )}
          </div>
        )}

        {!carregando && pagina >= totalPaginas && artigos.length > 0 && (
          <div className="fim-da-lista">Você chegou ao fim da lista</div>
        )}
      </main>
    </>
  );
}

function CardArtigo({ artigo }) {
  return (
    <a href={artigo.link} target="_blank" rel="noopener" className="card-artigo">
      <div className="card-img-wrapper">
        <img src={artigo.imagem} alt={artigo.titulo} loading="lazy"
             onError={(e) => { e.target.src = `https://picsum.photos/seed/${artigo.id}/600/360`; }} />
        <span className="tag tag-governanca">{artigo.categoria}</span>
      </div>
      <div className="card-conteudo">
        <h3>{artigo.titulo}</h3>
        <p>{artigo.resumo}</p>
        <div className="card-rodape">
          <div className="meta-info">
            <span><i className="fa-regular fa-calendar"></i> {artigo.data}</span>
            <span><i className="fa-regular fa-clock"></i> {artigo.leitura}</span>
          </div>
          <span className="btn-ler-mais pequeno">Ler <i className="fa-solid fa-arrow-right"></i></span>
        </div>
      </div>
    </a>
  );
}

function SkeletonCard() {
  return (
    <div className="card-artigo skeleton-card">
      <div className="sk sk-img"></div>
      <div className="card-conteudo">
        <div className="sk sk-line sk-line-curta"></div>
        <div className="sk sk-line"></div>
        <div className="sk sk-line"></div>
        <div className="sk sk-line sk-line-meia"></div>
        <div className="sk sk-rodape">
          <div className="sk sk-line sk-line-pequena"></div>
          <div className="sk sk-line sk-line-btn"></div>
        </div>
      </div>
    </div>
  );
}
