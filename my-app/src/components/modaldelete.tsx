import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import death from './images/death.png';
import { FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import Modal from 'react-modal';
import ModalPokemon from './modalupdate';
import fechar from './images/fechar.png';
import editar from './images/editar.png';
import seta from './images/seta.png'

const TextoElegante = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: #000000;
  line-height: 1.6;
  text-align: center;
  letter-spacing: 0.5px;
`;


const PokemonList = () => {


 
  const [pokemonSelecionado, setPokemonSelecionado] = useState(null);
  




  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (pokemons: any) => {
    setPokemonSelecionado(pokemons);
    setIsModalOpen(true);
  };

  const selecionarPokemon = ({pokemon}: any) => {
    setPokemonSelecionado(pokemon);
    setIsModalOpen(true)
  };




  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await api.get('/pokemons');
      setPokemons(response.data); // Supondo que a resposta da API seja o array de Pokémon
    };

    fetchPokemons();
  }, []);

  const handleDelete = async (pokemonId: string) => {
    try {
      await api.delete(`/pokemons/${pokemonId}`);
      // Atualiza a lista de pokémons removendo o pokémon deletado
      setPokemons(pokemons.filter(pokemon => pokemon.id !== pokemonId));
      window.location.reload(); 
    } catch (error) {
      // Trata erro caso a requisição falhe
      console.error("Erro ao deletar o pokémon:", error);
    }
  };

  return (
  <div style={{ 
    textAlign: 'center', // Centraliza o texto dentro de cada item.
    display: 'flex',
    flexDirection: 'column', // Muda a direção dos itens para coluna.
    justifyContent: 'center', // Centraliza os itens no eixo principal (agora vertical).
    alignItems: 'center', // Centraliza os itens no eixo cruzado (agora horizontal).
    flexWrap: 'wrap', // Permite que os itens sejam envolvidos, útil se você decidir mudar para linha novamente.
  }} className="container align-self-center d-flex justify-content-center" id="header4">
    {pokemons.map((pokemon) => (
      <div key={pokemon.id} style={{ marginBottom: '20px' }}> {/* Adiciona um espaço entre os itens */}
        <TextoElegante>{pokemon.name}</TextoElegante>
        <img id="meuBotao" style={{ width: '90px', height: 'auto' }} src={pokemon.imag} alt={pokemon.name} onClick={() => setIsModalOpen(true)} />
        <button id="meuBotao" onClick={() => handleDelete(pokemon.id)}><FaTrash size={18} color="red" /></button>
      </div>
    ))}




    <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
    <button id="meuBotao" onClick={() => setIsModalOpen(false)}><img src={fechar} style={{ width: '30px', height: 'auto'}} /></button>
      </Modal>
  </div>
  );
};



export default PokemonList;