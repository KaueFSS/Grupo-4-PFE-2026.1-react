import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import OQueFazemos from './pages/OQueFazemos';
import Artigos from './pages/Artigos';
import AssocieSe from './pages/Associe-se';
import QuemSomos from './pages/QuemSomos';
import Contato from './pages/Contato';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main className="page-fade">
        <Routes>
          <Route path="/"              element={<Home />} />
          <Route path="/o-que-fazemos" element={<OQueFazemos />} />
          <Route path="/artigos"       element={<Artigos />} />
          <Route path="/associe-se"    element={<AssocieSe />} />
          <Route path="/quem-somos"    element={<QuemSomos />} />
          <Route path="/contato"       element={<Contato />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
