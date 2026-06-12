import { Link } from 'react-router-dom';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">

        <div className="footer-logo">
          <img
            src="/logo.png"
            alt="Logo ACBrasil"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <p className="footer-logo-nome">ACBrasil</p>
          <p>Associação de Conselheiros do Brasil — promovendo governança e desenvolvimento sustentável.</p>
        </div>

        <div className="footer-links">
          <h3>Páginas</h3>
          <Link to="/">Home</Link>
          <Link to="/artigos">Artigos</Link>
          <Link to="/quem-somos">Quem Somos</Link>
          <Link to="/o-que-fazemos">O que fazemos</Link>
          <Link to="/contato">Contato</Link>
        </div>

        <div className="footer-descricao">
          <h3>Sobre nós</h3>
          <p>A ACBrasil congrega profissionais que atuam em Conselhos de Administração, Consultivos e Fiscais, promovendo boas práticas de Governança Corporativa em empresas brasileiras de todos os portes.</p>
        </div>

        <div className="footer-direito">
          <h3>Siga-nos</h3>
          <Link to="/associe-se" className="btn-associe">Associe-se à ACBrasil</Link>
          <div className="footer-redes">
            <a href="https://www.linkedin.com/company/associacao-de-conselheiros-do-brasil/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in"></i> LinkedIn
            </a>
            <a href="https://web.whatsapp.com/" target="_blank" rel="noopener" aria-label="WhatsApp">
              <i className="fa-brands fa-whatsapp"></i> WhatsApp
            </a>
            <a href="https://www.youtube.com/@acbrasil" target="_blank" rel="noopener" aria-label="YouTube">
              <i className="fa-brands fa-youtube"></i> YouTube
            </a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2025 ACBrasil — Associação de Conselheiros do Brasil. Todos os direitos reservados.</p>
        <div className="footer-bottom-links">
          <Link to="/contato">Política de Privacidade &amp; LGPD</Link>
        </div>
      </div>
    </footer>
  );
}
