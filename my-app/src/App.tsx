import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Pagina from './components/pagina_cadastro';
import Mensagem from './components/componente';
import "./components/Header/styles.css"
import './components/Header/styles.css'
import { api } from './services/api';
import { useEffect, useState } from 'react';
import Edicao from './components/pagina_edicao';
import fundo from './components/images/fundo.jpg'
import topo from './components/images/topo.png'


interface Pokemon {
  id: number;
  name: string;
  type: string;
  imag: string; 
}

function App() {

  const GlobalStyle = createGlobalStyle`
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-image: url(${fundo}); 
    background-size: cover; 
    background-position: center; 
    color: #333;
  }
  @media (max-width: 768px) {
    body {
      padding: 40px;
      background-image: url(${fundo}); 
      background-size: cover; 
    }
  }
`;

function getColorByType(type: string) {
  const colors: { [key: string]: string } = {
    'Normal': "#808080",
    'Fire': "#FF0000",
    'Water': "#0000FF",
    'Grass': "#90EE90",
    'Flying': "#ADD8E6",
    'Fighting': "#FF8C00",
    'Electric': "#FFFF00",
    'Ground': "#A52A2A",
    'Rock': "#654321",
    'Psychic': "#FFC0CB",
    'Ice': "#AFEEEE",
    'Bug': "#006400",
    'Ghost': "#800080",
    'Steel': "#C0C0C0",
    'Dragon': "#FF4500",
    'Dark': "#000000",
    'Fairy': "#FFB6C1" 
    
  };

  return colors[type] || "#FFB6C1"; 
}





  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setShowTopBtn(true); // Mostrar botão se a rolagem for maior que 300px
      } else {
        setShowTopBtn(false); // Esconder botão
      }
    });
  }, []);

  // Função para voltar ao topo
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Rolagem suave
    });
  };


  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await api.get('/pokemons');
      setPokemons(response.data); 
    };

    fetchPokemons();
  }, []);




  return (
    
    <div>
      
      <header>
      <GlobalStyle />
    <Router>
      <Routes>
        <Route path="/" element={<Mensagem />} />
        <Route path="/pagina_cadastro" element={<Pagina/>} />
        <Route path="/pagina_edicao" element={<Edicao/>} />
        
      </Routes>
    </Router>
    </header>
    <div>
            <img src='' alt=''/>  
    </div>
    <div style={{ 
        textAlign: 'center', 
        display: 'flex',
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        alignItems: 'center' }} className="container align-self-center d-flex justify-content-center" id="header">
    
        
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-container"> 
            <h3  className="pokemon-name" >{pokemon.name}</h3> 
            <img style={{ width: 'auto', height: '90px' }} src={pokemon.imag} alt={pokemon.name} /> 
            <p style={{ color: getColorByType(pokemon.type) }}>{pokemon.type}</p>
          </div>
        ))}
        
      
    </div>
    {showTopBtn && (
        <button id='meuBotao2' onClick={goToTop} className="meuBotaoAnimado"  style={{ position: 'fixed', top: '20px', left: '48.2%'}}>
          <img src={topo} alt="Voltar ao topo" style={{ width: '40px', height: 'auto' }} />
        </button>
      )}
    </div>
  );
}
export default App;
