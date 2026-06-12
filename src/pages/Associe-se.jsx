import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/associe-se.css';

const ESTADOS = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR',
  'PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',
];

// ── máscaras ───────────────────────────────────────────────
const mascaraCPF = (v) =>
  v.replace(/\D/g, '').slice(0, 11)
   .replace(/(\d{3})(\d)/, '$1.$2')
   .replace(/(\d{3})(\d)/, '$1.$2')
   .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

const mascaraTelefone = (v) =>
  v.replace(/\D/g, '').slice(0, 11)
   .replace(/(\d{2})(\d)/, '($1) $2')
   .replace(/(\d{5})(\d)/, '$1-$2');

const mascaraCEP = (v) =>
  v.replace(/\D/g, '').slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2');

const validarEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const validarCPF   = (c) => c.replace(/\D/g, '').length === 11;
const validarTel   = (t) => t.replace(/\D/g, '').length >= 10;
const validarCEP   = (c) => c.replace(/\D/g, '').length === 8;

export default function AssocieSe() {
  const [form, setForm] = useState({
    nome: '', email: '', cpf: '', celular: '',
    nascimento: '', cep: '', estado: '', termos: false,
  });
  const [erros, setErros]       = useState({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado]   = useState(false);

  const setCampo = (campo, valor) => {
    setForm(f => ({ ...f, [campo]: valor }));
    if (erros[campo]) setErros(e => ({ ...e, [campo]: null }));
  };

  function validar() {
    const e = {};
    if (!form.nome.trim() || form.nome.trim().length < 3) e.nome = 'Informe seu nome completo';
    if (!validarEmail(form.email))      e.email = 'E-mail inválido';
    if (!validarCPF(form.cpf))          e.cpf = 'CPF inválido';
    if (!validarTel(form.celular))      e.celular = 'Telefone inválido';
    if (!form.nascimento)               e.nascimento = 'Selecione uma data';
    if (!validarCEP(form.cep))          e.cep = 'CEP inválido';
    if (!form.estado)                   e.estado = 'Selecione um estado';
    if (!form.termos)                   e.termos = 'Você precisa aceitar os termos';
    setErros(e);
    return Object.keys(e).length === 0;
  }

  function enviar(ev) {
    if (!validar()) {
      ev.preventDefault();
      const primeiroCampoErro = document.querySelector('.input-erro, .checkbox-erro');
      primeiroCampoErro?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
  }

  return (
    <>
      <section className="page-banner">
        <div className="page-banner-conteudo">
          <p className="page-banner-tag"><i className="fa-solid fa-handshake"></i> Faça parte</p>
          <h1>Associe-se à ACBrasil</h1>
          <p className="page-banner-sub">Junte-se a uma rede de profissionais que transforma empresas através da governança corporativa.</p>
        </div>
      </section>

      {/* Benefícios em destaque */}
      <section className="beneficios-section">
        <div className="beneficios-grid">
          {[
            ['fa-network-wired',  'Networking qualificado', 'Acesso a uma rede exclusiva de conselheiros e executivos.'],
            ['fa-graduation-cap', 'Conhecimento contínuo',  'Eventos, artigos e conteúdos exclusivos sobre governança e ESG.'],
            ['fa-trophy',         'Visibilidade no mercado','Seu perfil entre os principais profissionais de conselho do Brasil.'],
            ['fa-shield-halved',  'Suporte especializado',  'Apoio técnico e jurídico em temas críticos de governança.'],
          ].map(([icon, titulo, desc]) => (
            <div className="beneficio-card" key={titulo}>
              <div className="beneficio-icone"><i className={`fa-solid ${icon}`}></i></div>
              <div>
                <strong>{titulo}</strong>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <main className="main-associe">
        <div className="associe-grid">
          {/* Coluna informativa */}
          <aside className="associe-info">
            <span className="qs-subtag">Por que se associar?</span>
            <h2>Junte-se a quem está mudando a governança no Brasil</h2>
            <p>
              A ACBrasil reúne profissionais comprometidos com a evolução da governança corporativa.
              Ao se associar, você passa a fazer parte de um movimento que impacta o futuro das empresas brasileiras.
            </p>
            <ul className="associe-lista">
              <li><i className="fa-solid fa-circle-check"></i> Participação em eventos exclusivos</li>
              <li><i className="fa-solid fa-circle-check"></i> Acesso antecipado a publicações e pesquisas</li>
              <li><i className="fa-solid fa-circle-check"></i> Inclusão no diretório de conselheiros</li>
              <li><i className="fa-solid fa-circle-check"></i> Descontos em cursos e certificações</li>
              <li><i className="fa-solid fa-circle-check"></i> Suporte permanente da rede ACBrasil</li>
            </ul>
            <div className="associe-depoimento">
              <i className="fa-solid fa-quote-left"></i>
              <p>"Fazer parte da ACBrasil foi um divisor de águas na minha carreira como conselheiro. A rede de relacionamento é simplesmente única."</p>
              <span>— Membro fundador, São Paulo</span>
            </div>
          </aside>

          {/* Formulário */}
          <section className="form-section">
            <div className="form-container">
              {!enviado ? (
                <>
                  <div className="form-topo">
                    <h2><i className="fa-solid fa-clipboard-list"></i> Formulário de adesão</h2>
                    <p>Preencha os dados abaixo para iniciar sua associação.</p>
                  </div>

                  <form action="https://formsubmit.co/devwebtms@gmail.com" method="POST" onSubmit={enviar} noValidate>
                    <div className="form-row">
                      <Campo label="Nome completo" erro={erros.nome}>
                        <input
                          type="text" placeholder="Seu nome completo"
                          value={form.nome}
                          onChange={(e) => setCampo('nome', e.target.value)}
                          className={erros.nome ? 'input-erro' : ''}
                        />
                      </Campo>

                      <Campo label="E-mail" erro={erros.email}>
                        <input
                          type="email" placeholder="seu@email.com"
                          value={form.email}
                          onChange={(e) => setCampo('email', e.target.value)}
                          className={erros.email ? 'input-erro' : ''}
                        />
                      </Campo>
                    </div>

                    <div className="form-row">
                      <Campo label="CPF" erro={erros.cpf}>
                        <input
                          type="text" placeholder="000.000.000-00"
                          value={form.cpf}
                          onChange={(e) => setCampo('cpf', mascaraCPF(e.target.value))}
                          className={erros.cpf ? 'input-erro' : ''}
                        />
                      </Campo>

                      <Campo label="Celular" erro={erros.celular}>
                        <input
                          type="tel" placeholder="(11) 99999-9999"
                          value={form.celular}
                          onChange={(e) => setCampo('celular', mascaraTelefone(e.target.value))}
                          className={erros.celular ? 'input-erro' : ''}
                        />
                      </Campo>
                    </div>

                    <div className="form-row tres-colunas">
                      <Campo label="Data de nascimento" erro={erros.nascimento}>
                        <input
                          type="date"
                          value={form.nascimento}
                          onChange={(e) => setCampo('nascimento', e.target.value)}
                          className={erros.nascimento ? 'input-erro' : ''}
                        />
                      </Campo>

                      <Campo label="CEP" erro={erros.cep}>
                        <input
                          type="text" placeholder="00000-000"
                          value={form.cep}
                          onChange={(e) => setCampo('cep', mascaraCEP(e.target.value))}
                          className={erros.cep ? 'input-erro' : ''}
                        />
                      </Campo>

                      <Campo label="Estado" erro={erros.estado}>
                        <select
                          value={form.estado}
                          onChange={(e) => setCampo('estado', e.target.value)}
                          className={erros.estado ? 'input-erro' : ''}
                        >
                          <option value="">Selecione</option>
                          {ESTADOS.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                        </select>
                      </Campo>
                    </div>

                    <div className={`checkbox-area ${erros.termos ? 'checkbox-erro' : ''}`}>
                      <input
                        id="termos"
                        type="checkbox"
                        checked={form.termos}
                        onChange={(e) => setCampo('termos', e.target.checked)}
                      />
                      <label htmlFor="termos">
                        Li e concordo com a <a href="#">Política de Privacidade</a> e o <a href="#">Código de Conduta</a> da ACBrasil
                      </label>
                    </div>
                    {erros.termos && <span className="campo-erro">{erros.termos}</span>}

                    <button type="submit" className="btn-enviar" disabled={enviando}>
                      {enviando
                        ? (<><span className="loader-spinner-grande"></span> Enviando...</>)
                        : (<><i className="fa-solid fa-paper-plane"></i> Enviar solicitação</>)}
                    </button>

                    <p className="form-disclaimer">
                      <i className="fa-solid fa-lock"></i> Seus dados estão protegidos. Nunca compartilhamos suas informações.
                    </p>
                  </form>
                </>
              ) : (
                <div className="form-sucesso">
                  <div className="sucesso-icone"><i className="fa-solid fa-circle-check"></i></div>
                  <strong>Solicitação enviada!</strong>
                  <p>Obrigado pelo interesse em se associar. Nossa equipe entrará em contato em breve com os próximos passos.</p>
                  <Link to="/" className="btn-enviar" style={{ marginTop: 24 }}>
                    Voltar ao início
                  </Link>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

// Componente helper de campo com label + erro
function Campo({ label, erro, children }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      {children}
      {erro && <span className="campo-erro">{erro}</span>}
    </div>
  );
}
