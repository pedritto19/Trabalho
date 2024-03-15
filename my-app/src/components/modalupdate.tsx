import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import death from './images/death.png';
import { FaTrash } from 'react-icons/fa';
import styled from 'styled-components';





const ModalPokemon = ( pokemon : any) => {


    

    return (
      <div>
        {/* Conteúdo do modal, exibindo os dados do Pokémon */}
        <h2>{pokemon.name}</h2>
        <img src={pokemon.imag} alt={pokemon.name} />
        <h3>{pokemon.type}</h3>
      </div>
    );
  };
  export default ModalPokemon