import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShaderBackground from '../components/ShaderBackground';
import { comCache } from '../utils/cache';
import '../styles/home.css';

const API_WP = 'https://acbrasil.org.br/cms/wp-json/wp/v2';

function TickerFinanceiro() {
  const [dolar,   setDolar]   = useState({ valor: '...', variacao: '', classe: '' });
  const [euro,    setEuro]    = useState({ valor: '...', variacao: '', classe: '' });
  const [libra,   setLibra]   = useState({ valor: '...', variacao: '', classe: '' });
  const [bitcoin, setBitcoin] = useState({ valor: '...', variacao: '', classe: '' });
  const [selic,   setSelic]   = useState('...');

  useEffect(() => {
    fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL')
      .then(r => r.json())
      .then(dados => {
        const formatar = (raw, setter) => {
          if (!raw) return;
          const pct = parseFloat(raw.pctChange);
          setter({
            valor: 'R$ ' + parseFloat(raw.bid).toFixed(2).replace('.', ','),
            variacao: (pct >= 0 ? '▲ ' : '▼ ') + Math.abs(pct).toFixed(2).replace('.', ',') + '%',
            classe: pct >= 0 ? 'positiva' : 'negativa',
          });
        };
        formatar(dados['USDBRL'], setDolar);
        formatar(dados['EURBRL'], setEuro);
        formatar(dados['GBPBRL'], setLibra);
        if (dados['BTCBRL']) {
          const pct = parseFloat(dados['BTCBRL'].pctChange);
          setBitcoin({
            valor: 'R$ ' + parseFloat(dados['BTCBRL'].bid).toLocaleString('pt-BR', { maximumFractionDigits: 0 }),
            variacao: (pct >= 0 ? '▲ ' : '▼ ') + Math.abs(pct).toFixed(2).replace('.', ',') + '%',
            classe: pct >= 0 ? 'positiva' : 'negativa',
          });
        }
      })
      .catch(() => {});

    fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.1178/dados/ultimos/1?formato=json')
      .then(r => r.json())
      .then(dados => {
        if (dados && dados[0]) setSelic(parseFloat(dados[0].valor).toFixed(2).replace('.', ',') + '%');
      })
      .catch(() => setSelic('indisponível'));
  }, []);

  const sep = <span className="ticker-sep">|</span>;

  const itens = (
    <>
      <div className="ticker-item">
        <i className="fa-solid fa-dollar-sign ticker-icone"></i>
        <span className="ticker-label">Dólar</span>
        <span className="ticker-valor">{dolar.valor}</span>
        {dolar.variacao && <span className={`ticker-variacao ${dolar.classe}`}>{dolar.variacao}</span>}
      </div>
      {sep}
      <div className="ticker-item">
        <i className="fa-solid fa-euro-sign ticker-icone"></i>
        <span className="ticker-label">Euro</span>
        <span className="ticker-valor">{euro.valor}</span>
        {euro.variacao && <span className={`ticker-variacao ${euro.classe}`}>{euro.variacao}</span>}
      </div>
      {sep}
      <div className="ticker-item">
        <i className="fa-solid fa-sterling-sign ticker-icone"></i>
        <span className="ticker-label">Libra</span>
        <span className="ticker-valor">{libra.valor}</span>
        {libra.variacao && <span className={`ticker-variacao ${libra.classe}`}>{libra.variacao}</span>}
      </div>
      {sep}
      <div className="ticker-item">
        <i className="fa-brands fa-bitcoin ticker-icone"></i>
        <span className="ticker-label">Bitcoin</span>
        <span className="ticker-valor">{bitcoin.valor}</span>
        {bitcoin.variacao && <span className={`ticker-variacao ${bitcoin.classe}`}>{bitcoin.variacao}</span>}
      </div>
      {sep}
      <div className="ticker-item">
        <i className="fa-solid fa-landmark ticker-icone"></i>
        <span className="ticker-label">Selic</span>
        <span className="ticker-valor">{selic}</span>
      </div>
      {sep}
    </>
  );

  return (
    <div className="ticker-financeiro">
      <div className="ticker-track">
        {itens}
        {itens}
        {itens}
        {itens}
        {itens}
        {itens}
      </div>
    </div>
  );
}

function StatCard({ icon, n, sufixo = '', label }) {
  const [valor, setValor] = useState(0);

  useEffect(() => {
    let raf;
    const el = document.querySelector(`[data-stat="${label}"]`);
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const inicio = performance.now();
      const dur = 1400;
      const animar = (t) => {
        const p = Math.min(1, (t - inicio) / dur);
        const ease = 1 - Math.pow(1 - p, 3);
        setValor(Math.round(n * ease));
        if (p < 1) raf = requestAnimationFrame(animar);
      };
      raf = requestAnimationFrame(animar);
      obs.disconnect();
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [n, label]);

  return (
    <div className="stat-item" data-stat={label}>
      <i className={`fa-solid ${icon} stat-icone`}></i>
      <div className="stat-info">
        <span className="stat-numero">{valor}{sufixo}</span>
        <span className="stat-label">{label}</span>
      </div>
    </div>
  );
}

const ARTIGOS_FALLBACK = [
  { titulo: 'Governança Corporativa no Brasil', excerpt: 'A importância da governança para empresas brasileiras de todos os portes.', data: '10/04/2025', autor: 'ACBrasil', img: 'https://picsum.photos/400/220?random=1' },
  { titulo: 'O Papel do Conselheiro Moderno',   excerpt: 'Como os conselheiros de administração estão se adaptando ao novo cenário.',  data: '05/03/2025', autor: 'ACBrasil', img: 'https://picsum.photos/400/220?random=2' },
  { titulo: 'ESG e Sustentabilidade Empresarial', excerpt: 'Práticas ESG já são exigência de grandes investidores no mercado atual.',   data: '20/02/2025', autor: 'ACBrasil', img: 'https://picsum.photos/400/220?random=3' },
];
const DESTAQUE_FALLBACK = [
  { titulo: 'Conselhos Consultivos em Startups',          excerpt: 'Como estruturar um conselho consultivo eficiente para empresas emergentes.',     data: '15/01/2025', autor: 'ACBrasil', img: 'https://picsum.photos/400/220?random=11' },
  { titulo: 'Diversidade nos Conselhos de Administração', excerpt: 'Estudos mostram que diversidade melhora a performance corporativa.',            data: '08/12/2024', autor: 'ACBrasil', img: 'https://picsum.photos/400/220?random=12' },
  { titulo: 'Regulação e Compliance para Conselheiros',   excerpt: 'O que os conselheiros precisam saber sobre as novas normas regulatórias.',      data: '30/11/2024', autor: 'ACBrasil', img: 'https://picsum.photos/400/220?random=13' },
];

function parsearArtigo(artigo, idx) {
  let img = `https://picsum.photos/400/220?random=${artigo.id || idx}`;
  if (artigo._embedded?.['wp:featuredmedia']?.[0]?.source_url)
    img = artigo._embedded['wp:featuredmedia'][0].source_url;

  const autor = artigo._embedded?.author?.[0]?.name || 'ACBrasil';
  const data = new Date(artigo.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  const div = document.createElement('div');
  div.innerHTML = artigo.excerpt?.rendered || '';
  let excerpt = div.textContent.trim().substring(0, 120);
  if (div.textContent.trim().length > 120) excerpt += '...';

  div.innerHTML = artigo.title?.rendered || 'Sem título';
  const titulo = div.textContent;

  const matchNum = titulo.match(/n[º°]\s*(\d{1,4})/i);
  const numero = matchNum ? matchNum[1] : null;

  return { id: artigo.id, titulo, excerpt, data, autor, img, link: artigo.link, numero };
}

function CardArtigo({ item, tagClasse, tagLabel }) {
  return (
    <div className="card-artigo">
      <div className="card-img-wrap">
        <img src={item.img} alt="" onError={e => e.target.src = 'https://picsum.photos/400/220?random=99'} />
      </div>
      <div className="card-conteudo">
        <div className="card-tags-linha">
          <span className={`tag ${tagClasse}`}>{tagLabel}</span>
          {item.numero && <span className="card-edicao">Newsletter Nº {item.numero}</span>}
        </div>
        <h3>{item.titulo}</h3>
        <p>{item.excerpt}</p>
        <div className="card-rodape">
          <div className="meta-info">
            <span>📅 {item.data}</span>
            <span>👤 {item.autor}</span>
          </div>
          <Link to={item.id ? `/artigos/${item.id}` : '/artigos'} className="btn-ler-mais pequeno">
            Ler mais ›
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [artigos,  setArtigos]  = useState(null);
  const [destaque, setDestaque] = useState(null);

  useEffect(() => {
    comCache('home_artigos', async () => {
      const r = await fetch(`${API_WP}/posts?per_page=3&_embed`);
      const data = await r.json();
      return data.map((a, i) => parsearArtigo(a, i));
    }).then(setArtigos).catch(() => setArtigos(ARTIGOS_FALLBACK));

    comCache('home_destaque', async () => {
      const r = await fetch(`${API_WP}/posts?per_page=3&offset=3&_embed`);
      const data = await r.json();
      return data.map((a, i) => parsearArtigo(a, i + 10));
    }).then(setDestaque).catch(() => setDestaque(DESTAQUE_FALLBACK));
  }, []);

  return (
    <main>
      <TickerFinanceiro />

      <section className="hero">
        <ShaderBackground />
        <div className="hero-overlay"></div>
        <div className="hero-conteudo">
          <p className="hero-subtag">Governança Corporativa</p>
          <h1 className="hero-titulo">Associação de<br />Conselheiros do Brasil</h1>
          <p className="hero-descricao">
            Fortalecendo a cultura de governança, ética e desenvolvimento sustentável
            em empresas brasileiras de todos os portes.
          </p>
          <div className="hero-btns">
            <Link to="/quem-somos" className="btn-hero-primario">
              <i className="fa-solid fa-circle-info"></i> Conheça a ACBrasil
            </Link>
            <Link to="/associe-se" className="btn-hero-secundario">
              Associe-se <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
        <div className="hero-stats">
          {[
            { icon: 'fa-users',          n: 500, sufixo: '+', label: 'Associados'         },
            { icon: 'fa-calendar-check', n: 15,  sufixo: '+', label: 'Anos de atuação'    },
            { icon: 'fa-newspaper',      n: 200, sufixo: '+', label: 'Artigos publicados' },
            { icon: 'fa-handshake',      n: 50,  sufixo: '+', label: 'Eventos realizados' },
          ].map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      <section className="artigos-recentes">
        <div className="secao-cabecalho">
          <h2>Artigos Recentes</h2>
          <Link to="/artigos" className="ver-todos">Ver todos <i className="fa-solid fa-arrow-right"></i></Link>
        </div>
        <div className="cards-artigos">
          {artigos === null
            ? <p className="carregando">Carregando artigos...</p>
            : artigos.map((a, i) => <CardArtigo key={i} item={a} tagClasse="tag-governanca" tagLabel="Governança" />)
          }
        </div>
      </section>

      <section className="sobre">
        <div className="sobre-conteudo">
          <div className="sobre-texto">
            <span className="sobre-subtag">Quem Somos</span>
            <h2>A Associação de<br />Conselheiros do Brasil</h2>
            <p>
              A ACBrasil congrega profissionais que atuam em Conselhos de Administração,
              Consultivos e Fiscais, promovendo boas práticas de Governança Corporativa
              em empresas brasileiras de todos os portes.
            </p>
            <p>
              Fundada com o propósito de fortalecer a cultura de governança no Brasil,
              oferecemos capacitação, networking e suporte técnico para conselheiros que
              buscam excelência na gestão corporativa.
            </p>
            <Link to="/quem-somos" className="btn-sobre">
              Saiba mais sobre nós <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="sobre-numeros">
            {[
              ['fa-users',         '500+', 'Associados ativos'],
              ['fa-calendar-check','15+',  'Anos de atuação'],
              ['fa-newspaper',     '200+', 'Artigos publicados'],
              ['fa-handshake',     '50+',  'Eventos realizados'],
            ].map(([icon, num, label]) => (
              <div className="numero-item" key={label}>
                <i className={`fa-solid ${icon} numero-icone`}></i>
                <span className="numero">{num}</span>
                <span className="numero-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="em-destaque">
        <div className="secao-cabecalho">
          <h2>Em Destaque</h2>
          <Link to="/artigos" className="ver-todos">Ver todos <i className="fa-solid fa-arrow-right"></i></Link>
        </div>
        <div className="cards-destaque">
          {destaque === null
            ? <p className="carregando">Carregando destaques...</p>
            : destaque.map((a, i) => <CardArtigo key={i} item={a} tagClasse="tag-esg" tagLabel="ESG" />)
          }
        </div>
      </section>
    </main>
  );
}
