import { useState, useEffect } from 'react';
import '../styles/quem-somos.css';


const founders = [
  {
    name: "Alexandre Reis",
    image:
      "https://acbrasil.org.br/cms/wp-content/uploads/2022/08/alexandre-reis.jpg",
    info: "Informações sobre o associado",
    link:
      "https://acbrasil.org.br/quem-somos/alexandre-reis/"
  },

  {
    name: "Américo Oliveira",
    image:
      "https://acbrasil.org.br/cms/wp-content/uploads/2022/08/americo-oliveira.jpg",
    info: "Informações sobre o associado",
    link:
      "https://acbrasil.org.br/quem-somos/americo-oliveira-2/"
  },

  { 
    name: "Antonio Almeida S. Junior", 
    image: "https://acbrasil.org.br/cms/wp-content/uploads/2022/08/antonio-almeida.jpg", 

    info: "Informações sobre o associado", 

    link:"https://acbrasil.org.br/quem-somos/antonio-almeida-junior/" 

  },

  { 
    name: "Carlos Alberto Ercolin", 

    image: "https://acbrasil.org.br/cms/wp-content/uploads/2022/08/carlos-ercolin.jpg", 

    info: "Informações sobre o associado", 

    link:"https://acbrasil.org.br/quem-somos/carlos-alberto-ercolin/" 

  },

  { 

    name: "Claudia Leite Ferreira", 

    image: "https://acbrasil.org.br/cms/wp-content/uploads/2022/08/claudia-leite-1.jpg", 

    info: "Informações sobre o associado", 

    link:"https://acbrasil.org.br/quem-somos/claudia-leite-ferreira/" 

  }, 

  { 

    name: "Gilberto Bueno", 

    image: "https://acbrasil.org.br/cms/wp-content/uploads/2022/08/buenogilberto.jpg", 

    info: "Informações sobre o associado", 

    link:"https://acbrasil.org.br/quem-somos/gilberto-bueno/" 

  }, 

  { 

    name: "Henrique Bravo", 

    image: "https://acbrasil.org.br/cms/wp-content/uploads/2022/08/henrique-bravo.jpg", 

    info: "Informações sobre o associado", 

    link:"https://acbrasil.org.br/quem-somos/henrique-bravo/" 

  }, 

  { 

    name:"Ítalo Martins de Oliveira", 

    image:"https://acbrasil.org.br/cms/wp-content/uploads/2022/08/italo-martins.jpg", 

    info: "Informações sobre o associado", 

    link: "https://acbrasil.org.br/quem-somos/italo-martins-de-oliveira/" 

  }, 

  { 

    name:"Manoel Carnaúba Cortez", 

    image:"https://acbrasil.org.br/cms/wp-content/uploads/2022/08/manuel_carnauba.jpg", 

    info: "Informações sobre o associado", 

    link:"https://acbrasil.org.br/quem-somos/manoel-carnauba-cortez/" 

  }, 

  { 

    name:"Paulo Sardinha", 

    image:"https://acbrasil.org.br/cms/wp-content/uploads/2022/08/paulo-sardinha.jpg", 

    info: "Informações sobre o associado", 

    link:"https://acbrasil.org.br/quem-somos/paulo-sardinha/" 

  }, 

  { 

    name:"Ricardo Gentil Peixoto da Costa", 

    image:"https://acbrasil.org.br/cms/wp-content/uploads/2022/08/ricardo-gentil.jpg", 

    info: "Informações sobre o associado", 

    link:"https://acbrasil.org.br/quem-somos/ricardo-gentil-peixoto-da-costa/" 

  }, 

  { 

    name:"Roque Martins", 

    image:"https://acbrasil.org.br/cms/wp-content/uploads/2022/08/roque-martins.jpg", 

    info:"Informações sobre o associado", 

    link:"https://acbrasil.org.br/quem-somos/roque-martins-2/" 

  }, 

  { 

    name:"Sérgio Araujo", 

    image:"https://acbrasil.org.br/cms/wp-content/uploads/2022/08/sergio_araujo.jpg", 

    info: "Informações sobre o associado", 

    link:"https://acbrasil.org.br/quem-somos/sergio-araujo/" 

  }, 

  { 

    name:"Telmo Bauler", 

    image:"https://acbrasil.org.br/cms/wp-content/uploads/2022/08/telmo-bauler.jpg", 

    info: "Informações sobre o associado", 

    link:"https://acbrasil.org.br/quem-somos/telmo-bauler/" 

  }
]

function FounderCard({ founder }) {

  return (

    <a
      className="founder-card"
      href={founder.link}
      target="_blank"
      rel="noopener noreferrer"
    >

      <div className="founder-image">

        <img
          src={founder.image}
          alt={founder.name}
        />

        <span className="founder-name">
          {founder.name}
        </span>

      </div>

      <div className="founder-info">
        <p>{founder.info}</p>
      </div>

    </a>
  )
}


 function QuemSomos() {

  const [currentIndex, setCurrentIndex] =
    useState(0)

  const [cardsPerView, setCardsPerView] =
    useState(window.innerWidth <= 768 ? 1 : 2)

  useEffect(() => {

    function handleResize() {

      setCardsPerView(
        window.innerWidth <= 768 ? 1 : 2
      )

      setCurrentIndex(0)
    }

    window.addEventListener(
      "resize",
      handleResize
    )

    return () => {

      window.removeEventListener(
        "resize",
        handleResize
      )

    }

  }, [])

  const totalSlides =
    Math.ceil(founders.length / cardsPerView)

  const visibleDots = 4

  const start =
    Math.floor(currentIndex / visibleDots)
    * visibleDots

  const end = start + visibleDots

  function nextSlide() {

    setCurrentIndex((prev) =>

      prev + 1 >= totalSlides
        ? 0
        : prev + 1

    )
  }

  function prevSlide() {

    setCurrentIndex((prev) =>

      prev - 1 < 0
        ? totalSlides - 1
        : prev - 1

    )
  }

  return (

    <main className="quem-somos">

      <section className="page-banner">

        <div className="page-banner-conteudo">

          <p className="page-banner-tag">
            A associação
          </p>

          <h1>Quem Somos</h1>

          <p className="page-banner-sub">
            Conheça os profissionais que
            fundaram a ACBrasil
          </p>

        </div>

      </section>

       <section className="quem-somos-section">

  <div>

    <h2 className="quem-somos-h2">
      Quem Somos
    </h2>

  </div>

  <div className="quem-somos-texto">

    <p>
      Fundada em 2022, a Associação
      de Conselheiros do Brasil (ACB)
      nasce com intuito de despertar
      a consciência sobre a importância
      e a necessidade da adoção da
      governança, influenciando e
      transformando positivamente a
      realidade das empresas brasileiras,
      em especial as PMEs.
    </p>

    <br />

    <p>
      Aliamos experiência,
      credibilidade e conhecimento,
      para orientar e ajudar a construir
      as melhores práticas de governança
      corporativa e otimização de processos.
    </p>

    <br />

    <p>
      Acreditamos que disseminar o
      conhecimento, educar e incluir
      as PMEs no universo da governança
      corporativa, é o caminho para o
      desenvolvimento e crescimento forte
      e sustentável do mercado brasileiro.
    </p>

  </div>

  <div className="btn-container">

    <a
      href="/associe-se"
      className="btn-associacao"
    >
      Faça sua associação
    </a>

  </div>

 </section>

      <section className="associados-section">

        <h2 className="associados-h2">
          Associados Fundadores
        </h2>

        <div className="slider-track-wrapper">

          <div
            className="slider-track"
            style={{
              transform:
                `translateX(-${currentIndex * 100}%)`
            }}
          >

            {Array.from({
              length: totalSlides
            }).map((_, slideIndex) => (

              <div
                className="slide"
                key={slideIndex}
              >

                {founders
                  .slice(
                    slideIndex * cardsPerView,
                    slideIndex * cardsPerView + cardsPerView
                  )
                  .map((founder) => (

                    <FounderCard
                      key={founder.name}
                      founder={founder}
                    />

                ))}

              </div>

            ))}

          </div>

        </div>

        <div className="slider-controls">

          <button
            className="slider-btn"
            onClick={prevSlide}
          >
            ←
          </button>

          <div className="slider-dots">

            {Array.from({
              length: totalSlides
            }).map((_, index) => (

              index >= start &&
              index < end && (

                <button
                  key={index}
                  className={
                    currentIndex === index
                      ? "dot active"
                      : "dot"
                  }
                  onClick={() =>
                    setCurrentIndex(index)
                  }
                />

              )

            ))}

          </div>

          <button
            className="slider-btn"
            onClick={nextSlide}
          >
            →
          </button>

        </div>

      </section>

    </main>

  )
}

export default QuemSomos