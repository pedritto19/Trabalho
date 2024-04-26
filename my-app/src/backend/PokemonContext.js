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
    const interval = setInterval(() => {
      fetchPokemons(); // Agora com lógica de comparação
    }, 86400000); // Atualiza a cada 5 segundos
  
    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
  }, [pokemons]); // Dependência adicionada para reagir às mudanças de 'pokemons'

  return (
    <PokemonContext.Provider value={{ pokemons, fetchPokemons }}>
      {children}
    </PokemonContext.Provider>
  );
};