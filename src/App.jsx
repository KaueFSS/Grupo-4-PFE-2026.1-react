import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

const Home        = lazy(() => import('./pages/Home'));
const OQueFazemos = lazy(() => import('./pages/OQueFazemos'));
const Artigos     = lazy(() => import('./pages/Artigos'));
const AssocieSe   = lazy(() => import('./pages/Associe-se'));
const QuemSomos   = lazy(() => import('./pages/QuemSomos'));
const Contato     = lazy(() => import('./pages/Contato'));

function PageLoading() {
  return (
    <div className="page-loading">
      <div className="page-loading-spinner" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main className="page-fade">
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/"              element={<Home />} />
            <Route path="/o-que-fazemos" element={<OQueFazemos />} />
            <Route path="/artigos"       element={<Artigos />} />
            <Route path="/associe-se"    element={<AssocieSe />} />
            <Route path="/quem-somos"    element={<QuemSomos />} />
            <Route path="/contato"       element={<Contato />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
