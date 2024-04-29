import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const PokemonContext = createContext();

export const usePokemons = () => useContext(PokemonContext);

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [apokemons, setApokemons] = useState([]);
  const arraysAreEqual = (array1, array2) => {
    return array1.length === array2.length && array1.every((element, index) => element === array2[index]);
  };

  // Definindo 'fetchPokemons' fora do useEffect para que possa ser acessada globalmente dentro deste componente
  const fetchPokemons = async () => {
    const response = await api.get('/pokemons');
    setPokemons(response.data);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!arraysAreEqual(pokemons, apokemons)) {
        fetchPokemons(); 
        setApokemons(pokemons);
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