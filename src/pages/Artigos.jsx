import { useState } from 'react';
import '../styles/artigos.css';

function Artigos() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('');
  const [termoBusca, setTermoBusca] = useState('');

  // Lista baseada no seu HTML original
  const listaArtigos = [
    {
      id: 1, categoria: "esg", tagClass: "tag-esg", tagNome: "ESG",
      titulo: "ESG e o Papel do Conselheiro nas Empresas Modernas",
      resumo: "Como os conselheiros estão liderando a agenda de sustentabilidade nas companhias brasileiras.",
      data: "07/07/2024", tempo: "5 min", imagem: "https://picsum.photos/id/1/400/220"
    },
    {
      id: 2, categoria: "carreira", tagClass: "tag-carreira", tagNome: "Carreira",
      titulo: "Como Desenvolver sua Carreira como Conselheiro",
      resumo: "Passo a passo para profissionais que desejam ingressar nos conselhos corporativos.",
      data: "26/11/2024", tempo: "7 min", imagem: "https://picsum.photos/id/2/400/220"
    },
    {
      id: 3, categoria: "mercado", tagClass: "tag-mercado", tagNome: "Mercado",
      titulo: "5 Práticas Essenciais para a Melhora Empresarial",
      resumo: "Fórmulas comprovadas que empresas de alto crescimento usam em seus boards.",
      data: "28/07/2024", tempo: "6 min", imagem: "https://picsum.photos/id/3/400/220"
    },
    {
      id: 4, categoria: "governanca", tagClass: "tag-governanca", tagNome: "Governança",
      titulo: "Estruturação de Conselhos Consultivos em Startups",
      resumo: "Por que startups em estágio inicial precisam de conselhos bem estruturados desde cedo.",
      data: "15/08/2024", tempo: "4 min", imagem: "https://picsum.photos/id/4/400/220"
    },
    {
      id: 5, categoria: "esg", tagClass: "tag-esg", tagNome: "ESG",
      titulo: "Métricas Sustentáveis para o Futuro",
      resumo: "Indicadores que os conselhos devem monitorar para garantir um crescimento sustentável.",
      data: "02/02/2024", tempo: "9 min", imagem: "https://picsum.photos/id/5/400/220"
    },
    {
      id: 6, categoria: "mercado", tagClass: "tag-mercado", tagNome: "Mercado",
      titulo: "Análise de Risco no Cenário Global",
      resumo: "Como os boards brasileiras estão se adaptando às incertezas do mercado internacional.",
      data: "10/10/2024", tempo: "6 min", imagem: "https://picsum.photos/id/6/400/220"
    },
    {
      id: 7, categoria: "carreira", tagClass: "tag-carreira", tagNome: "Carreira",
      titulo: "Liderança e Gestão de Conflitos no Board",
      resumo: "Estratégias para presidentes de conselho lidarem com divergências de forma construtiva.",
      data: "05/05/2024", tempo: "5 min", imagem: "https://picsum.photos/id/7/400/220"
    },
    {
      id: 8, categoria: "governanca", tagClass: "tag-governanca", tagNome: "Governança",
      titulo: "A Nova Lei de Sociedades Anônimas",
      resumo: "Impactos das recentes mudanças legislativas para conselhos de administração.",
      data: "12/01/2024", tempo: "10 min", imagem: "https://picsum.photos/id/8/400/220"
    },
    {
      id: 9, categoria: "esg", tagClass: "tag-esg", tagNome: "ESG",
      titulo: "Transição Energética e as Empresas de Base",
      resumo: "O papel dos conselhos na condução de empresas durante a mudança da matriz energética.",
      data: "20/03/2024", tempo: "7 min", imagem: "https://picsum.photos/id/9/400/220"
    }
  ];

  // Lógica de Filtro React
  const artigosFiltrados = listaArtigos.filter((artigo) => {
    const matchCategoria = categoriaAtiva === '' || artigo.categoria === categoriaAtiva;
    const matchBusca = artigo.titulo.toLowerCase().includes(termoBusca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  return (
    <>
      <section className="page-banner">
        <div className="page-banner-conteudo">
          <p className="page-banner-tag"><i className="fa-solid fa-newspaper"></i> Conteúdo</p>
          <h1>Artigos & Publicações</h1>
          <p className="page-banner-sub">Governança corporativa, ESG, carreira e muito mais</p>
        </div>
      </section>

      <div className="barra-categorias">
        <div className="barra-categorias-inner">
          <button className={`cat-pill ${categoriaAtiva === '' ? 'ativo' : ''}`} onClick={() => setCategoriaAtiva('')}>Todos</button>
          <button className={`cat-pill ${categoriaAtiva === 'governanca' ? 'ativo' : ''}`} onClick={() => setCategoriaAtiva('governanca')}>Governança</button>
          <button className={`cat-pill ${categoriaAtiva === 'esg' ? 'ativo' : ''}`} onClick={() => setCategoriaAtiva('esg')}>ESG</button>
          <button className={`cat-pill ${categoriaAtiva === 'carreira' ? 'ativo' : ''}`} onClick={() => setCategoriaAtiva('carreira')}>Carreira</button>
          <button className={`cat-pill ${categoriaAtiva === 'mercado' ? 'ativo' : ''}`} onClick={() => setCategoriaAtiva('mercado')}>Mercado</button>
        </div>
      </div>

      <main className="main-artigos">
        <section className="destaque-container">
          <div className="destaque-imagem">
            <img src="https://picsum.photos/id/0/800/500" alt="Imagem do Artigo Destaque" />
            <span className="destaque-badge"><i className="fa-solid fa-star"></i> Em destaque</span>
          </div>
          <div className="destaque-conteudo">
            <span className="tag tag-governanca">Governança</span>
            <h2>Importância da Governança Corporativa para Empresas Brasileiras</h2>
            <p>Como a implementação de boas práticas de governança pode transformar empresas de médio porte em referências de mercado, aumentando credibilidade e atraindo investidores.</p>
            <div className="destaque-meta">
              <span><i className="fa-regular fa-calendar"></i> 10 de abril de 2025</span>
              <span><i className="fa-regular fa-user"></i> João das Neves</span>
              <span><i className="fa-regular fa-clock"></i> 8 min de leitura</span>
            </div>
            <a href="#" className="btn-ler-mais">Ler artigo completo <i className="fa-solid fa-arrow-right"></i></a>
          </div>
        </section>

        <div className="filtros-wrapper">
          <div className="filtros-busca">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input 
              type="text" 
              placeholder="Buscar artigos por título ou autor..." 
              className="input-filtro" 
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </div>
          <div className="filtros-selects">
            <div className="select-wrapper">
              <i className="fa-solid fa-tag select-icone"></i>
              <select value={categoriaAtiva} onChange={(e) => setCategoriaAtiva(e.target.value)}>
                <option value="">Categoria</option>
                <option value="governanca">Governança</option>
                <option value="esg">ESG</option>
                <option value="carreira">Carreira</option>
                <option value="mercado">Mercado</option>
              </select>
            </div>
            <div className="select-wrapper">
              <i className="fa-solid fa-arrow-up-wide-short select-icone"></i>
              <select>
                <option value="recentes">Mais recentes</option>
                <option value="antigos">Mais antigos</option>
              </select>
            </div>
          </div>
        </div>

        <div className="secao-cabecalho">
          <div className="secao-titulo">
            <h2>Todos os artigos</h2>
            <hr />
          </div>
          <span className="artigos-contador">{artigosFiltrados.length} artigos</span>
        </div>

        <section className="grid-artigos" style={{ visibility: 'visible' }}>
          {artigosFiltrados.map((artigo) => (
            <div className="card-artigo" key={artigo.id}>
              <div className="card-img-wrapper">
                <img src={artigo.imagem} alt="Imagem Artigo" />
                <span className={`tag ${artigo.tagClass}`}>{artigo.tagNome}</span>
              </div>
              <div className="card-conteudo">
                <h3>{artigo.titulo}</h3>
                <p>{artigo.resumo}</p>
                <div className="card-rodape">
                  <div className="meta-info">
                    <span><i className="fa-regular fa-calendar"></i> {artigo.data}</span>
                    <span><i className="fa-regular fa-clock"></i> {artigo.tempo}</span>
                  </div>
                  <a href="#" className="btn-ler-mais pequeno">Ler <i className="fa-solid fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Somente o botão, como solicitado */}
        <button className="btn-carregar-mais">
          <i className="fa-solid fa-rotate"></i> Carregar mais artigos
        </button>

      </main>
    </>
  );
}

export default Artigos;