import React, { createContext, useContext, useState } from 'react';
import { api } from '../services/api';

const PokemonContext = createContext();

export const usePokemons = () => useContext(PokemonContext);

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);

  
  // Definindo 'fetchPokemons' fora do useEffect para que possa ser acessada globalmente dentro deste componente
  const fetchPokemons = async () => {
    const response = await api.get('/pokemons');
    
    setPokemons(response.data);
    
  };

  
  return (
    <PokemonContext.Provider value={{ pokemons, fetchPokemons }}>
      {children}
    </PokemonContext.Provider>
  );
};