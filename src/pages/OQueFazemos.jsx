import { useState } from 'react';
import { Link } from 'react-router-dom';

const css = `
.banner{background:linear-gradient(135deg,#091429 0%,#0d1b3e 55%,#1a3a6e 100%);padding:60px 32px;text-align:center;color:white;border-bottom:3px solid #f5c518;position:relative;overflow:hidden}
.banner-glow{position:absolute;top:-80px;right:-80px;width:360px;height:360px;background:radial-gradient(circle,rgba(245,197,24,0.08) 0%,transparent 70%);border-radius:50%;pointer-events:none}
.banner-glow2{position:absolute;bottom:-60px;left:-60px;width:260px;height:260px;background:radial-gradient(circle,rgba(26,86,219,0.1) 0%,transparent 70%);border-radius:50%;pointer-events:none}
.tag{display:inline-flex;align-items:center;gap:8px;background:rgba(245,197,24,0.12);color:#f5c518;border:1px solid rgba(245,197,24,0.35);font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:6px 16px;border-radius:20px;margin-bottom:20px}
.banner h1{font-size:42px;font-weight:700;color:white;margin:0 0 12px;letter-spacing:-0.5px}
.banner-sub{font-size:16px;color:#b0bdd6;line-height:1.6;max-width:520px;margin:0 auto 28px}
.banner-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn-primary{background:linear-gradient(135deg,#1a56db,#2563eb);color:white;border:none;padding:13px 28px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:transform 0.2s,box-shadow 0.2s;box-shadow:0 4px 14px rgba(26,86,219,0.4);text-decoration:none}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(26,86,219,0.5)}
.btn-outline{background:rgba(255,255,255,0.06);color:white;border:1px solid rgba(255,255,255,0.2);padding:13px 28px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:background 0.2s,border-color 0.2s;text-decoration:none}
.btn-outline:hover{background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.35)}
.stats{display:flex;justify-content:center;gap:40px;margin-top:36px;padding-top:32px;border-top:1px solid rgba(255,255,255,0.08);flex-wrap:wrap}
.stat{text-align:center}
.stat-num{font-size:28px;font-weight:700;color:#f5c518}
.stat-label{font-size:12px;color:#8a9ec0;margin-top:2px;text-transform:uppercase;letter-spacing:1px}
.intro{background:#f7f9fc;padding:56px 32px;border-bottom:1px solid #e8edf5;text-align:center}
.intro p{font-size:16px;line-height:1.9;color:#4a5568;max-width:820px;margin:0 auto}
.intro strong{color:#0d1b3e;font-weight:600}
.areas{padding:64px 32px;max-width:1100px;margin:0 auto}
.section-title{font-size:24px;font-weight:700;color:#0d1b3e;position:relative;display:inline-block;margin-bottom:0}
.section-title::after{content:'';position:absolute;bottom:-8px;left:0;width:48px;height:3px;background:#f5c518;border-radius:2px}
.filter-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px;margin-top:24px}
.filter-btn{background:white;border:1px solid #e2e8f0;color:#64748b;padding:7px 16px;border-radius:20px;font-size:13px;font-weight:500;cursor:pointer;transition:all 0.2s}
.filter-btn.active,.filter-btn:hover{background:#0d1b3e;color:white;border-color:#0d1b3e}
.cards-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.card{background:white;padding:24px 20px;border-radius:14px;border:1px solid #e2e8f0;display:flex;flex-direction:column;gap:12px;transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s;position:relative;overflow:hidden}
.card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:#f5c518;opacity:0;transition:opacity 0.25s}
.card:hover{transform:translateY(-6px);box-shadow:0 16px 40px rgba(13,27,62,0.12);border-color:#c4d0e8}
.card:hover::before{opacity:1}
.card-icon{width:48px;height:48px;border-radius:12px;background:#f0f4ff;display:flex;align-items:center;justify-content:center;font-size:22px}
.card-title{font-size:14px;font-weight:700;color:#0d1b3e;line-height:1.3}
.card-desc{font-size:12px;color:#64748b;line-height:1.6;flex:1}
.card-arrow{color:#cbd5e0;font-size:18px;align-self:flex-end;transition:color 0.2s,transform 0.2s;line-height:1}
.card:hover .card-arrow{color:#1a56db;transform:translateX(3px)}
.cta-section{background:linear-gradient(135deg,#091429,#0d1b3e);padding:64px 32px;text-align:center;border-top:1px solid #1e2d50}
.cta-section h2{font-size:28px;font-weight:700;color:white;margin:0 0 12px}
.cta-section p{color:#8a9ec0;font-size:15px;margin:0 0 28px}
@media(max-width:900px){.cards-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:500px){.cards-grid{grid-template-columns:1fr}.banner h1{font-size:30px}.stats{gap:24px}}
`;

const areas = [
  { icon: '🌐', title: 'Internacionalização', desc: 'Expansão estratégica para mercados globais com governança sólida.', cat: 'negocios' },
  { icon: '👤', title: 'Liderança', desc: 'Desenvolvimento de líderes e conselheiros de alto impacto.', cat: 'pessoas' },
  { icon: '🍃', title: 'Sustentabilidade', desc: 'ESG e práticas sustentáveis integradas à estratégia corporativa.', cat: 'estrategia' },
  { icon: '🚚', title: 'Logística', desc: 'Eficiência em cadeias de suprimento e operações de distribuição.', cat: 'negocios' },
  { icon: '🏛️', title: 'Cultura e organização', desc: 'Transformação cultural e redesenho organizacional.', cat: 'pessoas' },
  { icon: '📈', title: 'Sucessão', desc: 'Planejamento de sucessão para continuidade e perenidade.', cat: 'estrategia' },
  { icon: '🤝', title: 'Fusões e aquisições', desc: 'Due diligence, integração e governança em M&A.', cat: 'negocios' },
  { icon: '👥', title: 'Cultura organizacional', desc: 'Fortalecimento de valores e identidade corporativa.', cat: 'pessoas' },
];

const filtros = [
  { label: 'Todas', cat: 'all' },
  { label: 'Estratégia', cat: 'estrategia' },
  { label: 'Pessoas', cat: 'pessoas' },
  { label: 'Negócios', cat: 'negocios' },
];

function OQueFazemos() {
  const [filtroAtivo, setFiltroAtivo] = useState('all');
  const areasFiltradas = filtroAtivo === 'all' ? areas : areas.filter(a => a.cat === filtroAtivo);

  return (
    <>
      <style>{css}</style>

      <section className="banner">
        <div className="banner-glow"></div>
        <div className="banner-glow2"></div>
        <div className="tag">✦ Atuação</div>
        <h1>O que Fazemos</h1>
        <p className="banner-sub">
          Especialistas em governança corporativa que fortalecem conselhos,
          impulsionam estratégias e constroem empresas mais sólidas.
        </p>
        <div className="banner-btns">
          <Link to="/contato" className="btn-primary">💬 Fale conosco</Link>
          <Link to="/quem-somos" className="btn-outline">→ Saiba mais</Link>
        </div>
        <div className="stats">
          <div className="stat"><div className="stat-num">200+</div><div className="stat-label">Conselheiros</div></div>
          <div className="stat"><div className="stat-num">15+</div><div className="stat-label">Anos de mercado</div></div>
          <div className="stat"><div className="stat-num">8</div><div className="stat-label">Áreas de atuação</div></div>
          <div className="stat"><div className="stat-num">500+</div><div className="stat-label">Empresas atendidas</div></div>
        </div>
      </section>

      <section className="intro">
        <p>
          Na <strong>Associação de Conselheiros do Brasil (ACB)</strong>, reunimos executivos
          altamente experientes e reconhecidos no mercado, preparados para estruturar,
          implementar e fortalecer conselhos corporativos com excelência. Atuamos ao lado
          de empresas, conselhos e comitês executivos, apoiando desde a criação de boards
          até o desenvolvimento e desdobramento estratégico.
        </p>
      </section>

      <section className="areas">
        <h2 className="section-title">Áreas de atuação</h2>

        <div className="filter-row">
          {filtros.map(f => (
            <button
              key={f.cat}
              className={`filter-btn${filtroAtivo === f.cat ? ' active' : ''}`}
              onClick={() => setFiltroAtivo(f.cat)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="cards-grid">
          {areasFiltradas.map(area => (
            <div className="card" key={area.title}>
              <div className="card-icon">{area.icon}</div>
              <div className="card-title">{area.title}</div>
              <div className="card-desc">{area.desc}</div>
              <div className="card-arrow">→</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Pronto para fortalecer sua governança?</h2>
        <p>Entre em contato com nossos especialistas e descubra como podemos ajudar.</p>
        <Link to="/contato" className="btn-primary" style={{fontSize:'15px',padding:'15px 36px'}}>
          → Entrar em contato
        </Link>
      </section>
    </>
  );
}

export default OQueFazemos;