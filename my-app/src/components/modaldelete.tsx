import React, { useEffect, useState , FormEvent, ChangeEvent} from 'react';
import { api } from '../services/api';
import death from './images/death.png';
import { FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import Modal from 'react-modal';
import ModalPokemon from './modalupdate';
import fechar from './images/fechar.png';
import editar from './images/editar.png';
import seta from './images/seta.png'
import Input from './input'
import confirm from './images/confirm.png'
import "./Header/styles.css"
import { PokemonService } from '../services/PokemonService';

const TextoElegante = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: #000000;
  line-height: 1.6;
  text-align: center;
  letter-spacing: 0.5px;
`;
const TextoElegante2 = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
  color: #000000;
  line-height: 1.6;
  text-align: center;
  letter-spacing: 0.5px;
`;


const PokemonList = () => {
  


 
  const [pokemonSelecionado, setPokemonSelecionado] = useState(null);
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [imag, setImag] = useState('')
  const [error, setError] = useState(false)
  const [error1, setError1] = useState(false)
  const [error2, setError2] = useState(false)
  




  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null); 
  

  const openModal = (pokemons: any) => {
    setPokemonSelecionado(pokemons);
    setIsModalOpen(true);
  };

  const selecionarPokemon = ({pokemon}: any) => {
    setPokemonSelecionado(pokemon);
    setIsModalOpen(true)
  };

  const handleOpenModal = (pokemon: any) => {
    setSelectedPokemon(pokemon); // Armazena o Pokémon selecionado
    setIsModalOpen(true); // Abre o modal
  };
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const handleTypechange = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value)
  }
  const handleImagChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImag(e.target.value)
  }
  const updatedPokemon = {
    name: name || selectedPokemon?.name, // Usa o novo valor ou mantém o existente se não houver alteração
    type: type || selectedPokemon?.type,
    imag: imag || selectedPokemon?.imag,
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


   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name.trim()) {
      setError(true)
      setError1(false)
      setError2(false)
      return;
    } 
  
      // Validação para 'type'
      if (!type.trim()) {
        setError(false);
        setError1(true);
        setError2(false)
        return; 
      }
  
      // Validação para 'Imag'
      if (!imag.trim()) {
        setError(false)
        setError1(false)
        setError2(true);
        return; 
      }
    

      
      setError(false)
      setError1(false)
      setError2(false)
      e.preventDefault();
      const url = `http://localhost:3333/pokemons/${selectedPokemon?.id}`;
      try {
        const response = await api.put(`/pokemonsup/${selectedPokemon?.id}`, updatedPokemon); // Certifique-se de que a URL está correta
        if (response.status === 200) {
          console.log('Pokémon atualizado com sucesso:', response.data);
          window.location.reload(); 
          // Atualize o estado dos pokémons aqui, se necessário
          setIsModalOpen(false); // Fecha o modal após a atualização
          // Você pode querer recarregar os pokémons aqui para refletir as mudanças
        }
      } catch (error) {
        console.error('Erro ao atualizar o Pokémon:', error);
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
          <img
            id="meuBotao"
            style={{ width: '90px', height: 'auto' }}
            src={pokemon.imag}
            alt={pokemon.name}
            onClick={() => handleOpenModal(pokemon)} // Chama a função para abrir o modal e definir o Pokémon
          />
          <button id="meuBotao" onClick={() => handleDelete(pokemon.id)}>
            <FaTrash size={18} color="red" />
          </button>
        </div>
      ))}




    <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <button id="meuBotao" onClick={() => setIsModalOpen(false)}>
          <img src={fechar} style={{ width: '30px', height: 'auto'}} />
        </button>
        <div style={{ textAlign: 'center' }} className="container align-self-center d-flex justify-content-center" id="header">
      <form onSubmit={handleSubmit}>
        <h3 className="form-title"><TextoElegante>Editar</TextoElegante></h3>
        <Input
          type="text"
          
          value={name}
          name="name"
          error={error}
          onChange={handleNameChange}
          placeholder={selectedPokemon?.name}
        />
        <Input
        
          type="text"
          value={type}
          name="type"
          error={error1}
          onChange={handleTypechange}
          placeholder={selectedPokemon?.type}
        />
        <Input
          type="text"
          value={imag}
          name="imag"
          error={error2}
          onChange={handleImagChange}
          placeholder={selectedPokemon?.imag}
        />
        
      
        <button id="meuBotao"   type="submit"><img style={{ width: '30px', height: 'auto' }} src={confirm}/></button>

        

      </form>
      
      <div>
        <img src={imag} style={{ width: '100px', height: 'auto'}}/>
        
        <div id='header2'>
        <TextoElegante2>{name}</TextoElegante2>
        </div>
        <div id='header2'>
        <TextoElegante2>{type}</TextoElegante2>
        </div>
      </div>

    </div>
        {/* Mostra as informações do Pokémon selecionado no modal */}
        {selectedPokemon && (
          <div style={{ textAlign: 'center' }} className="container align-self-center d-flex justify-content-center" id="header4">
            <h2>{selectedPokemon.name}</h2>
            <img src={selectedPokemon.imag} alt={selectedPokemon.name} style={{ width: '100px', height: 'auto'}} />
            {/* Aqui você pode adicionar mais informações do Pokémon se desejar */}
          </div>
        )}
      </Modal>
  </div>
  );
};



export default PokemonList;