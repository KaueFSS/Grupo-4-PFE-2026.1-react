import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { buscarArtigoPorId } from '../utils/wordpress';
import '../styles/artigo.css';

export default function Artigo() {
  const { id } = useParams();
  const [artigo, setArtigo]         = useState(null);
  const [erro, setErro]             = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let cancelado = false;
    setCarregando(true);
    setErro(null);
    setArtigo(null);
    window.scrollTo(0, 0);

    buscarArtigoPorId(id)
      .then(a => { if (!cancelado) setArtigo(a); })
      .catch(() => { if (!cancelado) setErro('Não foi possível carregar este conteúdo.'); })
      .finally(() => { if (!cancelado) setCarregando(false); });

    return () => { cancelado = true; };
  }, [id]);

  if (carregando) {
    return (
      <div className="artigo-estado">
        <span className="loader-spinner-grande"></span>
        <p>Carregando conteúdo...</p>
      </div>
    );
  }

  if (erro || !artigo) {
    return (
      <div className="artigo-estado">
        <i className="fa-solid fa-triangle-exclamation artigo-estado-icone"></i>
        <strong>{erro || 'Conteúdo não encontrado'}</strong>
        <Link to="/artigos" className="btn-ler-mais">
          <i className="fa-solid fa-arrow-left"></i> Voltar para artigos
        </Link>
      </div>
    );
  }

  return (
    <article className="artigo-page">
      <header className="artigo-hero">
        <div className="artigo-hero-inner">
          <Link to="/artigos" className="artigo-voltar">
            <i className="fa-solid fa-arrow-left"></i> Voltar para artigos
          </Link>
          <div className="artigo-hero-tags">
            <span className="tag tag-governanca">{artigo.categoria}</span>
            {artigo.numero && <span className="artigo-edicao">Nº {artigo.numero}</span>}
          </div>
          <h1>{artigo.titulo}</h1>
          <div className="artigo-meta">
            <span><i className="fa-regular fa-user"></i> {artigo.autor}</span>
            <span><i className="fa-regular fa-calendar"></i> {artigo.data}</span>
            <span><i className="fa-regular fa-clock"></i> {artigo.leitura} de leitura</span>
          </div>
        </div>
      </header>

      <div className="artigo-corpo">
        {artigo.imagem && (
          <img
            className="artigo-imagem"
            src={artigo.imagem}
            alt=""
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}

        <div
          className="artigo-conteudo"
          dangerouslySetInnerHTML={{ __html: artigo.conteudo }}
        />

        {artigo.tags?.length > 0 && (
          <div className="artigo-tags">
            {artigo.tags.map(t => <span key={t} className="artigo-tag">#{t}</span>)}
          </div>
        )}

        <div className="artigo-rodape">
          <Link to="/artigos" className="btn-ler-mais">
            <i className="fa-solid fa-arrow-left"></i> Ver todos os artigos
          </Link>
        </div>
      </div>
    </article>
  );
}
