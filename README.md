# ACBrasil - Site Institucional

Site institucional da ACBrasil (Associação de Conselheiros do Brasil), desenvolvido como projeto final de extensão (PFE 2026.1) pelo Grupo 4.

## Sobre o Projeto

A ACBrasil é uma associação focada em governança corporativa no Brasil. O site foi desenvolvido com React e integra a API do WordPress da própria associação para exibir conteúdo dinâmico como artigos e notícias.

O design é baseado em uma paleta navy com dourado, escolhida por transmitir credibilidade e sofisticação alinhadas ao mercado de capitais e governança corporativa.

## Páginas

| Rota | Descrição |
|------|-----------|
| `/` | Home com ticker de câmbio, hero animado, artigos em destaque e estatísticas |
| `/o-que-fazemos` | Áreas de atuação com filtro por categoria |
| `/artigos` | Artigos integrados ao WordPress com busca, filtro e infinite scroll |
| `/quem-somos` | Perfis dos fundadores com busca em tempo real |
| `/associe-se` | Formulário de filiação com validação e máscaras BR |
| `/contato` | Canais de contato e formulário |

## Stack

- React 19 com lazy loading e Suspense
- React Router DOM 7
- Vite 8
- CSS puro (sem framework)
- WebGL / GLSL para animação de fundo
- Font Awesome via CDN

### APIs integradas

- WordPress REST API (acbrasil.org.br/cms/wp-json) para artigos e conteúdo
- Awesome API para cotações de câmbio (USD, EUR, GBP, BTC)
- API do Banco Central do Brasil para taxa Selic

## Como rodar

```bash
npm install
npm run dev
```

Para build de produção:

```bash
npm run build
```

## Estrutura

```
src/
├── pages/          # Páginas da aplicação
├── components/     # Header, Footer, ShaderBackground, ScrollToTop
├── hooks/          # useDebounce
├── utils/          # Integração com API WordPress
├── styles/         # CSS por página/componente
└── assets/         # Imagens e ícones
```

## Funcionalidades

- Busca no Header com sugestões em tempo real, histórico em localStorage e navegação por teclado
- Ticker de câmbio com dados ao vivo rolando na home
- Animação de contadores ao entrar na viewport
- Background animado com shader WebGL/GLSL
- Infinite scroll nos artigos
- Skeleton loading enquanto o conteúdo carrega
- Formulário com máscara para CPF, telefone e CEP

## Equipe

| Membro | Responsabilidades |
|--------|-------------------|
| Kaue | Header, busca, ShaderBackground, estrutura do App, responsividade mobile |
| Alice | Página O Que Fazemos, filtro por categoria, design dos cards |
| Caio | Página Artigos (infinite scroll, filtros, API) e Associe-se (formulário) |
| Julia | Página Quem Somos, diretório de fundadores, busca no diretório |

## Observações

- Os formulários de filiação e contato simulam o envio (sem backend real conectado)
- O conteúdo dos artigos é dinâmico via API WordPress da ACBrasil
