import React from 'react';
import beagle from './images/beagle.jpg'
import img from 'react-image'
import Pessoa from './components/componente'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Pagina from './components/pagina_cadastro';
import Mensagem from './components/componente';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mensagem />} />
        <Route path="/pagina_cadastro" element={<Pagina/>} />
      </Routes>
    </Router>
  );
}
export default App;
