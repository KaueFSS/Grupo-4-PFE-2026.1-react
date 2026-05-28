import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/o-que-fazemos.css';

const areas = [
  { icon: 'fa-globe',           title: 'Internacionalização',     desc: 'Expansão estratégica para mercados globais com governança sólida.',  cat: 'negocios'  },
  { icon: 'fa-user-tie',        title: 'Liderança',                desc: 'Desenvolvimento de líderes e conselheiros de alto impacto.',          cat: 'pessoas'   },
  { icon: 'fa-leaf',            title: 'Sustentabilidade',         desc: 'ESG e práticas sustentáveis integradas à estratégia corporativa.',   cat: 'estrategia'},
  { icon: 'fa-truck-fast',      title: 'Logística',                desc: 'Eficiência em cadeias de suprimento e operações de distribuição.',   cat: 'negocios'  },
  { icon: 'fa-building-columns',title: 'Cultura e organização',    desc: 'Transformação cultural e redesenho organizacional.',                  cat: 'pessoas'   },
  { icon: 'fa-chart-line',      title: 'Sucessão',                 desc: 'Planejamento de sucessão para continuidade e perenidade.',           cat: 'estrategia'},
  { icon: 'fa-handshake-simple',title: 'Fusões e aquisições',      desc: 'Due diligence, integração e governança em M&A.',                     cat: 'negocios'  },
  { icon: 'fa-people-group',    title: 'Cultura organizacional',   desc: 'Fortalecimento de valores e identidade corporativa.',                 cat: 'pessoas'   },
  { icon: 'fa-shield-halved',   title: 'Compliance & Risco',       desc: 'Estruturação de programas de integridade e gestão de riscos.',       cat: 'estrategia'},
  { icon: 'fa-chart-pie',       title: 'Estratégia',               desc: 'Definição de rumo, prioridades e planos de longo prazo.',            cat: 'estrategia'},
  { icon: 'fa-rocket',          title: 'Inovação',                 desc: 'Cultura de inovação e transformação digital nos boards.',            cat: 'negocios'  },
  { icon: 'fa-scale-balanced',  title: 'Governança',               desc: 'Estruturação de conselhos e melhores práticas de board.',            cat: 'estrategia'},
];

const filtros = [
  { label: 'Todas',      cat: 'all' },
  { label: 'Estratégia', cat: 'estrategia' },
  { label: 'Pessoas',    cat: 'pessoas' },
  { label: 'Negócios',   cat: 'negocios' },
];

export default function OQueFazemos() {
  const [filtroAtivo, setFiltroAtivo] = useState('all');

  const areasFiltradas = useMemo(() => (
    filtroAtivo === 'all' ? areas : areas.filter(a => a.cat === filtroAtivo)
  ), [filtroAtivo]);

  return (
    <>
      {/* Banner */}
      <section className="page-banner">
        <div className="page-banner-conteudo">
          <p className="page-banner-tag"><i className="fa-solid fa-briefcase"></i> Atuação</p>
          <h1>O que Fazemos</h1>
          <p className="page-banner-sub">
            Especialistas em governança corporativa que fortalecem conselhos,
            impulsionam estratégias e constroem empresas mais sólidas.
          </p>
          <div className="banner-btns">
            <Link to="/contato" className="btn-primary">
              <i className="fa-solid fa-envelope"></i> Fale conosco
            </Link>
            <Link to="/quem-somos" className="btn-outline">
              Saiba mais <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="banner-stats">
            <div className="bs-item"><span>200+</span><small>Conselheiros</small></div>
            <div className="bs-item"><span>15+</span><small>Anos de mercado</small></div>
            <div className="bs-item"><span>12</span><small>Áreas de atuação</small></div>
            <div className="bs-item"><span>500+</span><small>Empresas atendidas</small></div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="oq-intro">
        <p>
          Na <strong>Associação de Conselheiros do Brasil</strong>, reunimos executivos
          altamente experientes e reconhecidos no mercado, preparados para estruturar,
          implementar e fortalecer conselhos corporativos com excelência.
        </p>
      </section>

      {/* Áreas */}
      <section className="oq-areas">
        <div className="secao-cabecalho">
          <div className="secao-titulo">
            <h2>Áreas de atuação</h2>
            <hr />
          </div>
          <span className="contador">{areasFiltradas.length} áreas</span>
        </div>

        <div className="oq-filtros">
          {filtros.map(f => (
            <button
              key={f.cat}
              className={`oq-filtro-btn ${filtroAtivo === f.cat ? 'ativo' : ''}`}
              onClick={() => setFiltroAtivo(f.cat)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="oq-cards">
          {areasFiltradas.map(area => (
            <div className="oq-card" key={area.title}>
              <div className="oq-card-icone">
                <i className={`fa-solid ${area.icon}`}></i>
              </div>
              <h3>{area.title}</h3>
              <p>{area.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="oq-cta">
        <div className="oq-cta-inner">
          <h2>Pronto para fortalecer sua governança?</h2>
          <p>Entre em contato com nossos especialistas e descubra como podemos ajudar.</p>
          <Link to="/contato" className="btn-primary lg">
            Entrar em contato <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </section>
    </>
  );
}
