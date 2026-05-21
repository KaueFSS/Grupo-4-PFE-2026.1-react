import { useState } from 'react';
import '../styles/associe-se.css';

function AssocieSe() {
  const [formEnviado, setFormEnviado] = useState(false);

  const enviarAssociacao = (e) => {
    e.preventDefault();
    setFormEnviado(true);
  };

  return (
    <>
      <section className="page-banner">
        <div className="page-banner-conteudo">
          <p className="page-banner-tag"><i className="fa-solid fa-handshake"></i> Faça parte</p>
          <h1>Associe-se à ACBrasil</h1>
          <p className="page-banner-sub">Junte-se a uma rede de profissionais que transforma empresas por meio da governança corporativa</p>
        </div>
      </section>

      <section className="beneficios-section">
        <div className="beneficios-inner">
          <div className="beneficio-card">
            <div className="beneficio-icone"><i className="fa-solid fa-network-wired"></i></div>
            <div>
              <strong>Networking qualificado</strong>
              <p>Acesso a uma rede exclusiva de conselheiros e executivos de alto nível.</p>
            </div>
          </div>
          <div className="beneficio-divider"></div>
          <div className="beneficio-card">
            <div className="beneficio-icone"><i className="fa-solid fa-graduation-cap"></i></div>
            <div>
              <strong>Conhecimento contínuo</strong>
              <p>Eventos, artigos e conteúdos exclusivos sobre governança e ESG.</p>
            </div>
          </div>
          <div className="beneficio-divider"></div>
          <div className="beneficio-card">
            <div className="beneficio-icone"><i className="fa-solid fa-trophy"></i></div>
            <div>
              <strong>Visibilidade no mercado</strong>
              <p>Seu perfil entre os principais profissionais de conselho do Brasil.</p>
            </div>
          </div>
          <div className="beneficio-divider"></div>
          <div className="beneficio-card">
            <div className="beneficio-icone"><i className="fa-solid fa-shield-halved"></i></div>
            <div>
              <strong>Suporte especializado</strong>
              <p>Apoio técnico e jurídico em temas críticos de governança corporativa.</p>
            </div>
          </div>
        </div>
      </section>

      <main className="main-associe">
        <div className="associe-grid">
          <aside className="associe-info">
            <h2>Por que se associar?</h2>
            <p>A ACBrasil reúne profissionais comprometidos com a evolução da governança corporativa no Brasil. Ao se associar, você passa a fazer parte de um movimento que impacta diretamente o futuro das empresas brasileiras.</p>
            <ul className="associe-lista">
              <li><i className="fa-solid fa-check"></i> Participação em eventos exclusivos</li>
              <li><i className="fa-solid fa-check"></i> Acesso antecipado a publicações e pesquisas</li>
              <li><i class="fa-solid fa-check"></i> Inclusão no diretório de conselheiros</li>
              <li><i class="fa-solid fa-check"></i> Descontos em cursos e certificações</li>
              <li><i class="fa-solid fa-check"></i> Suporte da rede ACBrasil</li>
            </ul>
            <div className="associe-depoimento">
              <p>"Fazer parte da ACBrasil foi um divisor de águas na minha carreira como conselheiro."</p>
              <span>— Membro fundador, São Paulo</span>
            </div>
          </aside>

          <section className="form-section">
            <div className="form-container">
              {!formEnviado ? (
                <>
                  <div className="form-topo">
                    <h2><i className="fa-solid fa-clipboard-list"></i> Formulário de Adesão</h2>
                    <p>Preencha os dados abaixo para iniciar sua associação.</p>
                  </div>
                  <form onSubmit={enviarAssociacao}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="nome">Nome completo</label>
                        <input type="text" id="nome" name="nome" placeholder="Seu nome completo" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" name="email" placeholder="seu@email.com" required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="celular">Celular</label>
                        <input type="tel" id="celular" name="celular" placeholder="(11) 99999-9999" required />
                      </div>
                    </div>
                    <div className="form-row tres-colunas">
                      <div className="form-group">
                        <label htmlFor="nascimento">Data de nascimento</label>
                        <input type="date" id="nascimento" name="nascimento" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="cep">CEP</label>
                        <input type="text" id="cep" name="cep" placeholder="00000-000" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="estado">Estado</label>
                        <select id="estado" name="estado" required defaultValue="">
                          <option value="" disabled>Selecione</option>
                          <option value="SP">São Paulo</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="ES">Espírito Santo</option>
                          {/* Você pode adicionar os outros estados aqui se desejar */}
                        </select>
                      </div>
                    </div>
                    <div className="checkbox-area">
                      <input type="checkbox" id="termos" required />
                      <label htmlFor="termos">Li e concordo com a <a href="#">Política de Privacidade</a> e o <a href="#">Código de Conduta</a> da ACBrasil</label>
                    </div>
                    <button type="submit" className="btn-enviar">
                      <i className="fa-solid fa-handshake"></i> Enviar solicitação de associação
                    </button>
                  </form>
                </>
              ) : (
                <div className="form-sucesso" style={{ display: 'flex' }}>
                  <i className="fa-solid fa-circle-check"></i>
                  <strong>Solicitação enviada!</strong>
                  <p>Obrigado pelo interesse. Nossa equipe entrará em contato em breve.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default AssocieSe;