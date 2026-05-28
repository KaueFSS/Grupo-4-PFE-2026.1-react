import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// rola a página para o topo sempre que mudar de rota
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}
