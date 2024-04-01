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
    'Grass': "#008000",
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
            <h3>{pokemon.name}</h3> 
            <img style={{ width: '90px', height: 'auto' }} src={pokemon.imag} alt={pokemon.name} /> 
            <p className="pokemon-name" style={{ color: getColorByType(pokemon.type) }}>{pokemon.type}</p>
          </div>
        ))}
        
      
    </div>

    </div>
  );
}
export default App;
