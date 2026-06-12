import { comCache } from './cache';

export const API_WP = 'https://acbrasil.org.br/cms/wp-json/wp/v2';

function stripHtml(html) {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

export function formatarData(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function tempoLeitura(html) {
  const palavras = stripHtml(html).trim().split(/\s+/).length;
  const min = Math.max(1, Math.round(palavras / 200));
  return `${min} min`;
}

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

  const matchNum = titulo.match(/n[º°]\s*(\d{1,4})/i);
  const numero = matchNum ? matchNum[1] : null;

  return {
    id: post.id,
    titulo,
    numero,
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

function sanitizarConteudo(html) {
  if (!html) return '';
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('img:not([alt])').forEach(img => img.setAttribute('alt', ''));
    doc.querySelectorAll('a[target="_blank"]:not([rel])').forEach(a => a.setAttribute('rel', 'noopener noreferrer'));
    return doc.body.innerHTML;
  } catch (_) {
    return html;
  }
}

export function parseArtigoCompleto(post) {
  const base = parseArtigo(post);
  const tags = post._embedded?.['wp:term']?.[1]?.map(t => t.name) || [];
  return {
    ...base,
    conteudo: sanitizarConteudo(post.content?.rendered || ''),
    tags,
  };
}

export async function buscarArtigoPorId(id) {
  return comCache(`artigo_${id}`, async () => {
    const res = await fetch(`${API_WP}/posts/${id}?_embed`);
    if (!res.ok) throw new Error('Conteúdo não encontrado');
    const post = await res.json();
    return parseArtigoCompleto(post);
  });
}

const ORDEM_MAP = {
  recentes: { orderby: 'date',  order: 'desc' },
  antigos:  { orderby: 'date',  order: 'asc'  },
  titulo:   { orderby: 'title', order: 'asc'  },
};

export async function buscarCategorias() {
  return comCache('categorias', async () => {
    const params = new URLSearchParams({
      per_page: '100',
      orderby: 'count',
      order: 'desc',
      hide_empty: 'true',
    });
    const res = await fetch(`${API_WP}/categories?${params}`);
    if (!res.ok) return [];
    const dados = await res.json();
    return dados.map(c => ({ id: c.id, nome: c.name, count: c.count }));
  }, 1000 * 60 * 60 * 6);
}

export async function buscarArtigos({
  pagina = 1,
  porPagina = 9,
  busca = '',
  ordenacao = 'recentes',
  categoriaId = '',
} = {}) {
  const { orderby, order } = ORDEM_MAP[ordenacao] ?? ORDEM_MAP.recentes;

  const chave = `posts_${ordenacao}_${categoriaId || 'all'}_${busca || 'none'}_p${pagina}_n${porPagina}`;
  return comCache(chave, async () => {
    const params = new URLSearchParams({
      per_page: String(porPagina),
      page: String(pagina),
      _embed: 'true',
      orderby,
      order,
    });
    if (busca)       params.set('search',     busca);
    if (categoriaId) params.set('categories', String(categoriaId));

    const res = await fetch(`${API_WP}/posts?${params}`);
    const total = parseInt(res.headers.get('x-wp-totalpages') || '1', 10);
    if (!res.ok) throw new Error('Falha ao buscar artigos');
    const dados = await res.json();
    return { artigos: dados.map(parseArtigo), totalPaginas: total };
  });
}
