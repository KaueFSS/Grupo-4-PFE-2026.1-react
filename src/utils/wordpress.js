// Helpers para conversar com a API do WordPress da ACBrasil
export const API_WP = 'https://acbrasil.org.br/cms/wp-json/wp/v2';

// remove tags HTML de uma string (decodifica entidades também)
function stripHtml(html) {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

// formata datas pt-BR em formato curto (10 abr 2026)
export function formatarData(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

// estima tempo de leitura a partir do conteúdo (média 200 palavras/min)
function tempoLeitura(html) {
  const palavras = stripHtml(html).trim().split(/\s+/).length;
  const min = Math.max(1, Math.round(palavras / 200));
  return `${min} min`;
}

// normaliza um post bruto da WP-API em um objeto padronizado
export function parseArtigo(post) {
  const imagem =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    `https://picsum.photos/seed/acb-${post.id}/600/360`;

  const autor = post._embedded?.author?.[0]?.name || 'ACBrasil';

  const categoriaNome =
    post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Governança';
  const categoriaSlug = (categoriaNome || 'governanca')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-');

  const titulo = stripHtml(post.title?.rendered || 'Sem título').trim();
  const resumoRaw = stripHtml(post.excerpt?.rendered || '').trim();
  const resumo = resumoRaw.length > 160 ? resumoRaw.slice(0, 160) + '…' : resumoRaw;

  return {
    id: post.id,
    titulo,
    resumo,
    imagem,
    autor,
    data: formatarData(post.date),
    dataIso: post.date,
    leitura: tempoLeitura(post.content?.rendered || post.excerpt?.rendered),
    link: post.link,
    categoria: categoriaNome,
    categoriaSlug,
  };
}

// busca uma página de artigos
export async function buscarArtigos({ pagina = 1, porPagina = 9, busca = '' } = {}) {
  const params = new URLSearchParams({
    per_page: String(porPagina),
    page: String(pagina),
    _embed: 'true',
  });
  if (busca) params.set('search', busca);

  const res = await fetch(`${API_WP}/posts?${params}`);
  const total = parseInt(res.headers.get('x-wp-totalpages') || '1', 10);
  if (!res.ok) throw new Error('Falha ao buscar artigos');
  const dados = await res.json();
  return { artigos: dados.map(parseArtigo), totalPaginas: total };
}
