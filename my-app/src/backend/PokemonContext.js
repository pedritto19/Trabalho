import React, { createContext, useContext, useState, useEffect } from 'react';
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

  useEffect(() => {
    fetchPokemons(); // Chama a função sempre que o estado 'pokemons' for alterado
  }, [pokemons]); // Dependência 'pokemons' indica que o efeito reage às suas mudanças

  return (
    <PokemonContext.Provider value={{ pokemons, fetchPokemons }}>
      {children}
    </PokemonContext.Provider>
  );
};