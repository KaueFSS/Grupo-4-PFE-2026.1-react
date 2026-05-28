import { useEffect, useState } from 'react';

// retorna um valor "atrasado" — útil para pesquisa para não disparar uma busca a cada tecla
export default function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
