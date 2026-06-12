import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/quem-somos.css';

function linkedinSearch(name) {
  return 'https://www.linkedin.com/search/results/people/?keywords=' + encodeURIComponent(name);
}

const founders = [
  { name: 'Alexandre Reis',              image: 'https://acbrasil.org.br/cms/wp-content/uploads/2022/08/alexandre-reis.jpg',   linkedin: 'https://www.linkedin.com/in/alexandredosreis/' },
  { name: 'Américo Oliveira',            image: 'https://acbrasil.org.br/cms/wp-content/uploads/2022/08/americo-oliveira.jpg', linkedin: linkedinSearch('Américo Oliveira ACBrasil') },
  { name: 'Antonio Almeida S. Junior',   image: 'https://acbrasil.org.br/cms/wp-content/uploads/2022/08/antonio-almeida.jpg', linkedin: linkedinSearch('Antonio Almeida Junior ACBrasil') },
  { name: 'Carlos Alberto Ercolin',      image: 'https://acbrasil.org.br/cms/wp-content/uploads/2022/08/carlos-ercolin.jpg',  linkedin: 'https://www.linkedin.com/in/carlosercolin/' },
  { name: 'Claudia Leite Ferreira',      image: 'https://acbrasil.org.br/cms/wp-content/uploads/2022/08/claudia-leite-1.jpg', linkedin: 'https://www.linkedin.com/in/claudia-leite-ferreira-2b76461a/' },
  { name: 'Gilberto Bueno',              image: 'https://acbrasil.org.br/cms/wp-content/uploads/2022/08/buenogilberto.jpg',   linkedin: linkedinSearch('Gilberto Bueno ACBrasil') },
  { name: 'Henrique Bravo',              image: 'https://acbrasil.org.br/cms/wp-content/uploads/2022/08/henrique-bravo.jpg',  linkedin: linkedinSearch('Henrique Bravo ACBrasil') },
  { name: 'Ítalo Martins de Oliveira',   image: 'https://acbrasil.org.br/cms/wp-content/uploads/2022/08/italo-martins.jpg',   linkedin: 'https://www.linkedin.com/in/italoxmartins/' },
  { name: 'Manoel Carnaúba Cortez',      image: 'https://acbrasil.org.br/cms/wp-content/uploads/2022/08/manuel_carnauba.jpg', linkedin: 'https://www.linkedin.com/in/manoel-carnauba-cortez-96797591/' },
  { name: 'Paulo Sardinha',              image: 'https://acbrasil.org.br/cms/wp-content/uploads/2022/08/paulo-sardinha.jpg',  linkedin: 'https://www.linkedin.com/in/paulo-sardinha-73730428/' },
  { name: 'Ricardo Gentil Peixoto da Costa', image: 'https://acbrasil.org.br/cms/wp-content/uploads/2022/08/ricardo-gentil.jpg', linkedin: linkedinSearch('Ricardo Gentil Peixoto da Costa') },
  { name: 'Roque Martins',               image: 'https://acbrasil.org.br/cms/wp-content/uploads/2022/08/roque-martins.jpg',   linkedin: 'https://www.linkedin.com/in/roque-martins-me-gb-99388229/' },
  { name: 'Sérgio Araujo',               image: 'https://acbrasil.org.br/cms/wp-content/uploads/2022/08/sergio_araujo.jpg',   linkedin: 'https://www.linkedin.com/in/sergio-araujo-552b2ab7/' },
  { name: 'Telmo Bauler',                image: 'https://acbrasil.org.br/cms/wp-content/uploads/2022/08/telmo-bauler.jpg',    linkedin: 'https://www.linkedin.com/in/telmobauler/' },
];

function FounderCard({ founder }) {
  return (
    <a className="founder-card" href={founder.linkedin} target="_blank" rel="noopener noreferrer">
      <div className="founder-image">
        <img src={founder.image} alt={founder.name} loading="lazy"
             onError={(e) => e.target.src = `https://ui-avatars.com/api/?background=0d1b3e&color=f5c518&size=300&name=${encodeURIComponent(founder.name)}`} />
        <div className="founder-overlay">
          <span><i className="fa-brands fa-linkedin"></i> Ver LinkedIn</span>
        </div>
      </div>
      <div className="founder-info">
        <h3>{founder.name}</h3>
        <span>Conselheiro Fundador</span>
      </div>
    </a>
  );
}

export default function QuemSomos() {
  const [filtro, setFiltro] = useState('');

  const filtrados = useMemo(() => {
    const t = filtro.trim().toLowerCase();
    if (!t) return founders;
    return founders.filter(f => f.name.toLowerCase().includes(t));
  }, [filtro]);

  return (
    <>
      {/* Banner */}
      <section className="page-banner">
        <div className="page-banner-conteudo">
          <p className="page-banner-tag"><i className="fa-solid fa-people-group"></i> A associação</p>
          <h1>Quem Somos</h1>
          <p className="page-banner-sub">Conheça os profissionais que fundaram a ACBrasil e impulsionam a governança corporativa no país.</p>
        </div>
      </section>

      {/* Sobre nós */}
      <section className="qs-sobre">
        <div className="qs-sobre-grid">
          <div className="qs-sobre-texto">
            <span className="qs-subtag">Nossa história</span>
            <h2>Fundada em <span>2022</span></h2>
            <p>
              A Associação de Conselheiros do Brasil (ACB) nasce com o intuito de despertar a consciência
              sobre a importância e a necessidade da adoção da governança, influenciando e transformando
              positivamente a realidade das empresas brasileiras, em especial as PMEs.
            </p>
            <p>
              Aliamos experiência, credibilidade e conhecimento para orientar e ajudar a construir
              as melhores práticas de governança corporativa e otimização de processos.
            </p>
            <p>
              Acreditamos que disseminar o conhecimento, educar e incluir as PMEs no universo da
              governança corporativa é o caminho para o desenvolvimento sustentável do mercado brasileiro.
            </p>
            <Link to="/associe-se" className="qs-btn">
              Faça parte da ACBrasil <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

          <div className="qs-pilares">
            <div className="pilar">
              <i className="fa-solid fa-bullseye"></i>
              <strong>Missão</strong>
              <p>Disseminar boas práticas de governança nas empresas brasileiras.</p>
            </div>
            <div className="pilar">
              <i className="fa-solid fa-eye"></i>
              <strong>Visão</strong>
              <p>Ser referência nacional em desenvolvimento de conselheiros.</p>
            </div>
            <div className="pilar">
              <i className="fa-solid fa-handshake-angle"></i>
              <strong>Valores</strong>
              <p>Ética, transparência, excelência e desenvolvimento contínuo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Conselheiros */}
      <section className="qs-associados">
        <div className="qs-associados-header">
          <div>
            <h2 className="associados-h2">Associados Fundadores</h2>
            <p>{founders.length} conselheiros que tornaram a ACBrasil possível.</p>
          </div>
          <div className="qs-filtro">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Buscar conselheiro..."
              aria-label="Buscar conselheiro"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
        </div>

        {filtrados.length > 0 ? (
          <div className="founders-grid">
            {filtrados.map(f => <FounderCard key={f.name} founder={f} />)}
          </div>
        ) : (
          <div className="qs-vazio">
            <i className="fa-solid fa-user-slash"></i>
            <strong>Nenhum conselheiro encontrado</strong>
            <p>Tente buscar por outro nome.</p>
          </div>
        )}
      </section>
    </>
  );
}
