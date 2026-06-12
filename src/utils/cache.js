const PREFIXO = 'acb_cache_v2_';
const TTL_PADRAO = 1000 * 60 * 30;

function lerCache(chave) {
  try {
    const bruto = localStorage.getItem(PREFIXO + chave);
    if (!bruto) return null;
    const { data, exp } = JSON.parse(bruto);
    if (!exp || exp < Date.now()) {
      localStorage.removeItem(PREFIXO + chave);
      return null;
    }
    return data;
  } catch (_) {
    return null;
  }
}

function gravarCache(chave, data, ttl) {
  const registro = JSON.stringify({ data, exp: Date.now() + ttl });
  try {
    localStorage.setItem(PREFIXO + chave, registro);
  } catch (_) {
    limparExpirados();
    try { localStorage.setItem(PREFIXO + chave, registro); } catch (_) { return; }
  }
}

export async function comCache(chave, fn, ttl = TTL_PADRAO) {
  const cacheado = lerCache(chave);
  if (cacheado !== null) return cacheado;

  const data = await fn();
  gravarCache(chave, data, ttl);
  return data;
}

export function limparExpirados() {
  const agora = Date.now();
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const k = localStorage.key(i);
    if (!k || !k.startsWith(PREFIXO)) continue;
    try {
      const { exp } = JSON.parse(localStorage.getItem(k));
      if (!exp || exp < agora) localStorage.removeItem(k);
    } catch (_) {
      localStorage.removeItem(k);
    }
  }
}

export function limparCache() {
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const k = localStorage.key(i);
    if (k && k.startsWith(PREFIXO)) localStorage.removeItem(k);
  }
}
