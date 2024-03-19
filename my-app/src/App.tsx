import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Pagina from './components/pagina_cadastro';
import Mensagem from './components/componente';
import "./components/Header/styles.css"
import './components/Header/styles.css'
import { api } from './services/api';
import { useEffect, useState } from 'react';
import {FaTrash} from 'react-icons/fa';
import Edicao from './components/pagina_edicao';



function App() {
  const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #f0f0f5;
    color: #333;
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

  return colors[type] || "#FFB6C1"; // cor padrão se o tipo não for encontrado
}


  
function dividirNomePokemon(nome: string) {
  // Calcula o ponto de divisão, que é a metade do comprimento da string
  let pontoDeDivisao = Math.floor(nome.length / 2);

  // Divide o nome em duas partes
  let primeiraParte = nome.substring(0, pontoDeDivisao);
  let segundaParte = nome.substring(pontoDeDivisao);

  // Retorna as duas partes
  return [primeiraParte, segundaParte];
}
  interface pokemons {
    id: string;
    name: string;
    imag: string; 
    type: string; 
  }


  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await api.get('/pokemons');
      setPokemons(response.data); 
    };

    fetchPokemons();
  }, []);

let isEditingPage=false;


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
            <img src=''/>  
    </div>
    <div style={{ 
        textAlign: 'center', 
        display: 'flex',
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        alignItems: 'center' }} className="container align-self-center d-flex justify-content-center" id="header">
    
        {/* Renderização dos Pokémon */}
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-container"> 
            <h3>{pokemon.name}</h3> 
            <img style={{ width: '90px', height: 'auto' }} src={pokemon.imag} alt={pokemon.name} /> 
            <h2 className="pokemon-name" style={{ color: getColorByType(pokemon.type) }}>{pokemon.type}</h2>
          </div>
        ))}
        
      
    </div>

    </div>
  );
}
export default App;
