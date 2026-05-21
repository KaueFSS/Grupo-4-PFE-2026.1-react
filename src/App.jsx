import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OQueFazemos from './pages/OQueFazemos';
import Artigos from './pages/Artigos';
import AssocieSe from './pages/Associe-se';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/o-que-fazemos" element={<OQueFazemos />} />
        <Route path="/artigos" element={<Artigos />} />
        <Route path="/associe-se" element={<AssocieSe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;