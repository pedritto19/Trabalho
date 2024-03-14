import React, { useReducer } from 'react';
import beagle from './images/beagle.jpg'
import img from 'react-image'
import Pessoa from './components/componente'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Pagina from './components/pagina_cadastro';
import Mensagem from './components/componente';
import "./components/Header/styles.css"
import './components/Header/styles.css'
import { api } from './services/api';
import { useEffect, useState } from 'react';


function App() {

  interface pokemons {
    id: string;
    name: string;
    imag: string; // Certifique-se de que o nome da propriedade está correto. No seu código original, estava 'imag', o que parece ser um erro de digitação.
    type: string; // Adicione esta linha se os Pokémons devem ter um tipo.
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




  return (
    
    <div>
      <header>
    <Router>
      <Routes>
        <Route path="/" element={<Mensagem />} />
        <Route path="/pagina_cadastro" element={<Pagina/>} />
        
      </Routes>
    </Router>
    </header>
    <div>
            <img src=''/>  
    </div>
    <div style={{ textAlign: 'center' }} className="container align-self-center d-flex justify-content-center" id="header3">
    
        {/* Renderização dos Pokémon */}
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-container"> 
            <h3>{pokemon.name}</h3> 
            <img style={{ width: '90px', height: 'auto' }} src={pokemon.imag} alt={pokemon.name} /> 
            <h3> {pokemon.type}</h3>
          </div>
        ))}
      
    </div>
    </div>
  );
}
export default App;
