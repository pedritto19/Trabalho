import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Pagina from './components/pagina_cadastro';
import Mensagem from './components/componente';
import "./components/Header/styles.css"
import './components/Header/styles.css'
import { api } from './services/api';
import { useEffect, useState } from 'react';
import {FaTrash} from 'react-icons/fa';
import Edicao from './components/pagina_edicao';



function App() {
  
  interface pokemons {
    id: string;
    name: string;
    imag: string; 
    type: string; 
  }


  const [pokemons, setPokemons] = useState([]);

  // Efeito para carregar os Pokémon quando o componente for montado
  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await api.get('/pokemons');
      setPokemons(response.data); // Supondo que a resposta da API seja o array de Pokémon
    };

    fetchPokemons();
  }, []);

let isEditingPage=false;


  return (
    
    <div>
      <header>
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
        alignItems: 'center' }} className="container align-self-center d-flex justify-content-center" id="header3">
    
        {/* Renderização dos Pokémon */}
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-container"> 
            <h3>{pokemon.name}</h3> 
            <img style={{ width: '90px', height: 'auto' }} src={pokemon.imag} alt={pokemon.name} /> 
            <h3>{pokemon.type}</h3>
          </div>
        ))}
        
      
    </div>

    </div>
  );
}
export default App;
