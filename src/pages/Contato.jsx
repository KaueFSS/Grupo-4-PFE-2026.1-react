import { useState } from 'react';
import '../styles/contato.css';

const ASSUNTOS = [
  'Quero me associar',
  'Dúvidas sobre eventos',
  'Parcerias e patrocínios',
  'Imprensa',
  'Sugestões',
  'Outro',
];

export default function Contato() {
  const [form, setForm] = useState({
    nome: '', email: '', telefone: '',
    assunto: '', mensagem: '',
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'E-mail inválido';
    if (!form.assunto) e.assunto = 'Selecione um assunto';
    if (!form.mensagem.trim() || form.mensagem.trim().length < 10) e.mensagem = 'A mensagem precisa ter ao menos 10 caracteres';
    setErros(e);
    return Object.keys(e).length === 0;
  }

  function enviar(ev) {
    ev.preventDefault();
    if (!validar()) return;
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      setEnviado(true);
    }, 1100);
  }

  const mascaraTel = (v) =>
    v.replace(/\D/g, '').slice(0, 11)
     .replace(/(\d{2})(\d)/, '($1) $2')
     .replace(/(\d{5})(\d)/, '$1-$2');

  return (
    <>
      {/* Banner */}
      <section className="page-banner">
        <div className="page-banner-conteudo">
          <p className="page-banner-tag"><i className="fa-solid fa-envelope-open-text"></i> Fale conosco</p>
          <h1>Entre em Contato</h1>
          <p className="page-banner-sub">
            Tire dúvidas, sugira pautas ou solicite parcerias. Nossa equipe responde em até 24 horas úteis.
          </p>
        </div>
      </section>

      {/* Cards de canais de contato */}
      <section className="ct-canais">
        <div className="ct-canais-grid">
          <a href="mailto:contato@acbrasil.org.br" className="canal-card">
            <div className="canal-icone azul"><i className="fa-solid fa-envelope"></i></div>
            <strong>E-mail</strong>
            <p>contato@acbrasil.org.br</p>
            <span className="canal-acao">Enviar e-mail <i className="fa-solid fa-arrow-right"></i></span>
          </a>

          <a href="https://wa.me/5511999999999" target="_blank" rel="noopener" className="canal-card">
            <div className="canal-icone verde"><i className="fa-brands fa-whatsapp"></i></div>
            <strong>WhatsApp</strong>
            <p>(11) 99999-9999</p>
            <span className="canal-acao">Conversar agora <i className="fa-solid fa-arrow-right"></i></span>
          </a>

          <a href="tel:+551133334444" className="canal-card">
            <div className="canal-icone amarelo"><i className="fa-solid fa-phone"></i></div>
            <strong>Telefone</strong>
            <p>(11) 3333-4444</p>
            <span className="canal-acao">Ligar <i className="fa-solid fa-arrow-right"></i></span>
          </a>

          <a href="https://www.linkedin.com/company/associacao-de-conselheiros-do-brasil/"
             target="_blank" rel="noopener" className="canal-card">
            <div className="canal-icone roxo"><i className="fa-brands fa-linkedin-in"></i></div>
            <strong>LinkedIn</strong>
            <p>@acbrasil</p>
            <span className="canal-acao">Seguir <i className="fa-solid fa-arrow-right"></i></span>
          </a>
        </div>
      </section>

      {/* Formulário + informações */}
      <main className="ct-main">
        <div className="ct-grid">

          {/* Coluna info */}
          <aside className="ct-info">
            <span className="qs-subtag">Atendimento</span>
            <h2>Estamos aqui para ajudar</h2>
            <p>
              Quer saber mais sobre a ACBrasil, propor uma parceria ou entender como participar
              de nossos eventos? Preencha o formulário ou use um dos canais ao lado — retornaremos
              o mais breve possível.
            </p>

            <div className="ct-info-bloco">
              <div className="ct-info-item">
                <i className="fa-solid fa-clock"></i>
                <div>
                  <strong>Horário de atendimento</strong>
                  <span>Segunda a sexta, das 9h às 18h</span>
                </div>
              </div>
              <div className="ct-info-item">
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <strong>Endereço</strong>
                  <span>Av. Paulista, 1000 — São Paulo / SP</span>
                </div>
              </div>
              <div className="ct-info-item">
                <i className="fa-solid fa-clock-rotate-left"></i>
                <div>
                  <strong>Tempo médio de resposta</strong>
                  <span>Até 24 horas úteis</span>
                </div>
              </div>
            </div>

            <div className="ct-faq">
              <strong><i className="fa-solid fa-circle-question"></i> Antes de enviar:</strong>
              <p>Para se associar, visite a página <a href="/associe-se">Associe-se</a>. Para ler nossas publicações, acesse <a href="/artigos">Artigos</a>.</p>
            </div>
          </aside>

          {/* Coluna formulário */}
          <section className="ct-form-section">
            <div className="ct-form-container">
              {!enviado ? (
                <>
                  <div className="form-topo">
                    <h2><i className="fa-solid fa-paper-plane"></i> Envie sua mensagem</h2>
                    <p>Preencha o formulário e nossa equipe entrará em contato.</p>
                  </div>

                  <form onSubmit={enviar} noValidate>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Nome completo</label>
                        <input
                          type="text"
                          placeholder="Seu nome"
                          value={form.nome}
                          onChange={(e) => setCampo('nome', e.target.value)}
                          className={erros.nome ? 'input-erro' : ''}
                        />
                        {erros.nome && <span className="campo-erro">{erros.nome}</span>}
                      </div>
                      <div className="form-group">
                        <label>E-mail</label>
                        <input
                          type="email"
                          placeholder="seu@email.com"
                          value={form.email}
                          onChange={(e) => setCampo('email', e.target.value)}
                          className={erros.email ? 'input-erro' : ''}
                        />
                        {erros.email && <span className="campo-erro">{erros.email}</span>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Telefone <span className="opcional">(opcional)</span></label>
                        <input
                          type="tel"
                          placeholder="(11) 99999-9999"
                          value={form.telefone}
                          onChange={(e) => setCampo('telefone', mascaraTel(e.target.value))}
                        />
                      </div>
                      <div className="form-group">
                        <label>Assunto</label>
                        <select
                          value={form.assunto}
                          onChange={(e) => setCampo('assunto', e.target.value)}
                          className={erros.assunto ? 'input-erro' : ''}
                        >
                          <option value="">Selecione</option>
                          {ASSUNTOS.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                        {erros.assunto && <span className="campo-erro">{erros.assunto}</span>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>
                        Mensagem
                        <span className="contador-chars">{form.mensagem.length}/500</span>
                      </label>
                      <textarea
                        rows={6}
                        maxLength={500}
                        placeholder="Como podemos ajudar?"
                        value={form.mensagem}
                        onChange={(e) => setCampo('mensagem', e.target.value)}
                        className={erros.mensagem ? 'input-erro' : ''}
                      />
                      {erros.mensagem && <span className="campo-erro">{erros.mensagem}</span>}
                    </div>

                    <button type="submit" className="btn-enviar" disabled={enviando}>
                      {enviando
                        ? (<><span className="loader-spinner-grande"></span> Enviando...</>)
                        : (<><i className="fa-solid fa-paper-plane"></i> Enviar mensagem</>)}
                    </button>

                    <p className="form-disclaimer">
                      <i className="fa-solid fa-lock"></i> Suas informações estão protegidas e não serão compartilhadas.
                    </p>
                  </form>
                </>
              ) : (
                <div className="form-sucesso">
                  <div className="sucesso-icone"><i className="fa-solid fa-circle-check"></i></div>
                  <strong>Mensagem enviada!</strong>
                  <p>Obrigado pelo contato. Nossa equipe responderá em até 24 horas úteis.</p>
                  <button
                    className="btn-enviar"
                    style={{ marginTop: 24, maxWidth: 240 }}
                    onClick={() => {
                      setEnviado(false);
                      setForm({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' });
                    }}
                  >
                    Enviar nova mensagem
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
