import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const PokemonContext = createContext();

export const usePokemons = () => useContext(PokemonContext);

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [ apokemons,asetpokemons] = useState([]);

  // Definindo 'fetchPokemons' fora do useEffect para que possa ser acessada globalmente dentro deste componente
  const fetchPokemons = async () => {
    const response = await api.get('/pokemons');
    setPokemons(response.data);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (apokemons !== pokemons) {
        fetchPokemons(); 
        asetpokemons(pokemons);
      }

      
    }, 60); 
  
    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
  }); // Dependência adicionada para reagir às mudanças de 'pokemons'

  return (
    <PokemonContext.Provider value={{ pokemons, fetchPokemons }}>
      {children}
    </PokemonContext.Provider>
  );
};