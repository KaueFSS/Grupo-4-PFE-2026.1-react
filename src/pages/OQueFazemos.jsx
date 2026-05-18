import { Link } from 'react-router-dom';

const css = `
.page-banner {
  width: 100%;
  background: linear-gradient(135deg, #091429 0%, #0d1b3e 55%, #1a3a6e 100%);
  padding: 55px 30px;
  text-align: center;
  color: white;
  border-bottom: 3px solid #f5c518;
  position: relative;
  overflow: hidden;
}
.page-banner::before {
  content: '';
  position: absolute;
  top: -50px; right: -50px;
  width: 280px; height: 280px;
  background: radial-gradient(circle, rgba(245,197,24,0.07) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}
.page-banner-conteudo {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.page-banner-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(245, 197, 24, 0.12);
  color: #f5c518;
  border: 1px solid rgba(245, 197, 24, 0.35);
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 20px;
  margin-bottom: 16px;
}
.page-banner h1 {
  font-size: 38px;
  font-weight: bold;
  color: white;
  margin-bottom: 12px;
}
.page-banner-sub {
  font-size: 15px;
  color: #b0bdd6;
  line-height: 1.6;
}
.main-content {
  background-color: #ffffff;
  padding: 0;
}
.intro-section {
  background-color: #f7f9fc;
  padding: 60px 30px;
  border-bottom: 1px solid #e8edf5;
}
.intro-text {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.8;
  color: #4a5568;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}
.areas-section {
  padding: 70px 30px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.section-title {
  font-size: 26px;
  font-weight: bold;
  color: #0d1b3e;
  display: inline-block;
  padding-bottom: 12px;
  border-bottom: 3px solid #f5c518;
  margin-bottom: 24px;
}
.btn-fale-conosco {
  background: linear-gradient(135deg, #1a56db 0%, #2563eb 100%);
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 50px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 14px rgba(26, 86, 219, 0.35);
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
}
.btn-fale-conosco:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(26, 86, 219, 0.5);
}
.cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}
.card {
  background-color: white;
  padding: 22px 18px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 14px;
  font-weight: 700;
  font-size: 14px;
  color: #0d1b3e;
  justify-content: flex-start;
  transition: transform 0.2s, box-shadow 0.2s;
  text-align: left;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(13, 27, 62, 0.1);
  border-color: #c4d0e8;
}
.card .icon {
  font-size: 26px;
  flex-shrink: 0;
}
@media (max-width: 900px) {
  .cards-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 500px) {
  .cards-grid { grid-template-columns: 1fr; }
  .page-banner h1 { font-size: 28px; }
}
`;

const areas = [
  { icon: '🌐', label: 'Internacionalização' },
  { icon: '👤', label: 'Liderança' },
  { icon: '🍃', label: 'Sustentabilidade' },
  { icon: '🚚', label: 'Logística' },
  { icon: '🏛️', label: 'Cultura e organização' },
  { icon: '📈', label: 'Sucessão' },
  { icon: '🤝', label: 'Fusões e aquisições' },
  { icon: '👥', label: 'Cultura organizacional' },
];

function OQueFazemos() {
  return (
    <>
      <style>{css}</style>
      <main className="main-content">

        <section className="page-banner">
          <div className="page-banner-conteudo">
            <p className="page-banner-tag">
              <i className="fa-solid fa-briefcase"></i> Atuação
            </p>
            <h1>O que Fazemos</h1>
            <p className="page-banner-sub">
              Nossas áreas de atuação e especialidades em governança corporativa
            </p>
          </div>
        </section>

        <section className="intro-section">
          <p className="intro-text">
            Na Associação de Conselheiros do Brasil (ACB), reunimos executivos altamente
            experientes e reconhecidos no mercado, preparados para estruturar, implementar
            e fortalecer conselhos corporativos com excelência.<br />
            Atuamos ao lado de empresas, conselhos e comitês executivos, apoiando desde
            a criação de boards até o desenvolvimento e desdobramento estratégico, além
            de oferecer suporte em temas críticos que impulsionam crescimento, governança
            e sustentabilidade dos negócios.
          </p>
        </section>

        <section className="areas-section">
          <h2 className="section-title">Áreas de atuação</h2>

          <Link to="/contato" className="btn-fale-conosco">
            <span>💬</span> Fale conosco
          </Link>

          <div className="cards-grid">
            {areas.map((area) => (
              <div className="card" key={area.label}>
                <span className="icon">{area.icon}</span>
                {area.label}
              </div>
            ))}
          </div>
        </section>

      </main>
    </>
  );
}

export default OQueFazemos;