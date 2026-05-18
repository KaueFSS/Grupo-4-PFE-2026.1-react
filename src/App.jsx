import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OQueFazemos from './pages/OQueFazemos';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/o-que-fazemos" element={<OQueFazemos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;