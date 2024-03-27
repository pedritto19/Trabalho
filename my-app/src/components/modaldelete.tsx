import React, { useEffect, useState , FormEvent, ChangeEvent} from 'react';
import { api } from '../services/api';
import death from './images/death.png';
import { FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import Modal from 'react-modal';
import fechar from './images/fechar.png';
import editar from './images/editar.png';
import seta from './images/seta.png'
import Input from './input'
import confirm from './images/confirm.png'
import "./Header/styles.css"
import { PokemonService } from '../services/PokemonService';
import fundo from './images/fundo.jpg'

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
const estilos = {
  lista: {
    display: 'flex',
    flexWrap: 'wrap', // Permite que os itens se alinhem em múltiplas linhas
    justifyContent: 'space-around', // Distribui o espaço igualmente
    alignItems: 'center' // Centraliza os itens verticalmente
  },
  item: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column', // Organiza o conteúdo em colunas
    alignItems: 'center', // Centraliza horizontalmente
    width: '200px' // Define uma largura fixa para cada item
  },
  imagem: {
    width: '90px',
    height: 'auto'
  }
};
function getColorByType(type: string) {
  const colors: { [key: string]: string } = {
    'Normal': "#808080",
    'Fire': "#FF0000",
    'Water': "#0000FF",
    'Grass': "#008000",
    'Flying': "#ADD8E6",
    'Fighting': "#FF8C00",
    'Electric': "#FFFF00",
    'Ground': "#A52A2A",
    'Rock': "#654321",
    'Psychic': "#FFC0CB",
    'Ice': "#AFEEEE",
    'Bug': "#006400",
    'Ghost': "#800080",
    'Steel': "#C0C0C0",
    'Dragon': "#FF4500",
    'Dark': "#000000",
    'Fairy': "#FFB6C1" 
    
  };

  return colors[type] || "#FFB6C1"; 
}
const PokemonList = () => {
  


 
  const [pokemonSelecionado, setPokemonSelecionado] = useState(null);

  const [error, setError] = useState(false)
  const [error1, setError1] = useState(false)
  const [error2, setError2] = useState(false)
  const [errorType, setErrorType] = useState(false);
  




  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null); 
  const [name, setName] = useState(selectedPokemon?.name)
  const [type, setType] = useState(selectedPokemon?.type)
  const [imag, setImag] = useState(selectedPokemon?.imag)
  

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
  const handleTypechange = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value)

  }
  const handleImagChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImag(e.target.value)
  }



  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await api.get('/pokemons');
      setPokemons(response.data); 
    };

    fetchPokemons();
  }, []);

  const handleDelete = async (pokemonId: string) => {
    try {
      await api.delete(`/pokemons/${pokemonId}`);

      setPokemons(pokemons.filter(pokemon => pokemon.id !== pokemonId));
      window.location.reload(); 
    } catch (error) {

      console.error("Erro ao deletar o pokémon:", error);
    }
  };

  
  const updatedPokemon = {
    name: name || selectedPokemon?.name, 
    type: type || selectedPokemon?.type,
    imag: imag || selectedPokemon?.imag,
  };
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name.trim()) {
      setError(true)
      setError1(false)
      setError2(false)
      return;
    } 
  

      if (!type.trim()) {
        setError(false);
        setError1(true);
        setError2(false)
        return; 
      }
  

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
        const response = await api.put(`/pokemonsup/${selectedPokemon?.id}`, updatedPokemon);
        if (response.status === 200) {
          console.log('Pokémon atualizado com sucesso:', response.data);
          window.location.reload(); 
        
          setIsModalOpen(false); 
       
        }
      } catch (error) {
        console.error('Erro ao atualizar o Pokémon:', error);
      }
    };




  return (
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '20px' }} className="container align-self-center d-flex justify-content-center" id="header4">
      {pokemons.map((pokemon) => (
    <div key={pokemon.id} style={{ marginBottom: '20px', width: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <button id='meuBotao' onClick={() => handleOpenModal(pokemon)}  ><img src={editar} style={{ width: '30px', height: 'auto'}} /></button>
            <img
            
         
            style={{ width: '90px', height: 'auto' }}
            src={pokemon.imag}
            alt={pokemon.name}
           
          />
          
          <button id="meuBotao" onClick={() => handleDelete(pokemon.id)}>
            <FaTrash size={18} color="red" />
          </button>
          <TextoElegante>{pokemon.name}</TextoElegante>


        </div>
      ))}




    <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            width: '1000px', // Define a largura do modal
            height: '800px', // Define a altura do modal
            margin: 'auto', // Centraliza o modal na tela
            backgroundImage: `url(${fundo})`,
            backgroundSize: 'cover',
            filter: 'brightness(100%)', // Ajusta o brilho da imagem
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.20)',
            
          }
        }}><div className="modal-content">
        <button id="meuBotao" onClick={() => setIsModalOpen(false)}>
          <img src={fechar} style={{ width: '30px', height: 'auto'}} />
        </button>
        <div style={{ textAlign: 'center' }} className="container align-self-center d-flex justify-content-center" >
      <form onSubmit={handleSubmit}>
        <h3 className="form-title"><TextoElegante>Editar</TextoElegante></h3>
        <Input
          type="text"
          defaultValue={selectedPokemon?.name}
          value={name}
          name="name"
          error={error}
          onChange={handleNameChange}
          placeholder={selectedPokemon?.name}
        />
        <select
          name="type"
          value={type}
          
          onChange={handleTypechange}
          className={`beautifulInput ${error ? 'error' : ''}`}
          
        >
          <option value={selectedPokemon?.type} >{selectedPokemon?.type}</option>
          <option value="Normal">Normal</option>
          <option value="Fire">Fire</option>
          <option value="Water">Water</option>
          <option value="Grass">Grass</option>
          <option value="Flying">Flying</option>
          <option value="Fighting">Fighting</option>
          <option value="Electric">Electric</option>
          <option value="Ground">Ground</option>
          <option value="Rock">Rock</option>
          <option value="Psychic">Psychic</option>
          <option value="Ice">Ice</option>
          <option value="Bug">Bug</option>
          <option value="Ghost">Ghost</option>
          <option value="Steel">Steel</option>
          <option value="Dragon">Dragon</option>
          <option value="Dark">Dark</option>
          <option value="Fairy">Fairy</option>
         
        </select>
        <Input
          type="text"
          defaultValue={selectedPokemon?.imag}
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
        <TextoElegante2 style={{color: getColorByType(type)}}> {type} </TextoElegante2>
        </div>
      </div>

    </div>
      
        {selectedPokemon && (
          <div style={{ textAlign: 'center' }} className="container align-self-center d-flex justify-content-center" id="header">
            <h2>{selectedPokemon.name}</h2>
            <img src={selectedPokemon.imag} alt={selectedPokemon.name} style={{ width: '100px', height: 'auto'}} />
            <p className="pokemon-name" style={{color: getColorByType(selectedPokemon.type)}}>{selectedPokemon.type}</p>
          </div>
        )}
        </div>
      </Modal>
  </div>
  );
};



export default PokemonList;