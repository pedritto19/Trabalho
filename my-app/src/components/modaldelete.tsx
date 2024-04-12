import React, { useEffect, useState , FormEvent, ChangeEvent} from 'react';
import { api } from '../services/api';
import { FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import Modal from 'react-modal';
import fechar from './images/fechar.png';
import editar from './images/editar.png';
import Input from './input'
import confirm from './images/confirm.png'
import "./Header/styles.css"
import fundo from './images/fundo.jpg'
import paste from './images/paste.png';
import load from './images/load.gif'

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
const TextoElegante3 = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: red;
  line-height: 1.6;
  text-align: center;
  letter-spacing: 0.5px;
`;
const TextoElegante4 = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: #90EE90;
  line-height: 1.6;
  text-align: center;
  letter-spacing: 0.5px;
`;



interface Pokemon {
  id: string;
  name: string;
  type: string;
  imag: string; 
}
interface PokemonS {
  id: string;
  name: string;
  type: string;
  imag: string;
}

function getColorByType(type: any) {
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
  

 


  const [error, setError] = useState(false)
  const [error1, setError1] = useState(false)
  const [error2, setError2] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  




  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonS | null>(null);
  const [name, setName] = useState(selectedPokemon?.name)
  const [type, setType] = useState(selectedPokemon?.type)
  const [imag, setImag] = useState(selectedPokemon?.imag)
  const [showMessage, setShowMessage] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

 
 

  const handleOpenModal = (pokemon: any) => {
    setSelectedPokemon(pokemon); // Armazena o Pokémon selecionado
    setIsModalOpen(true); // Abre o modal
  };
  const handleOpenModal2 = (pokemon: any) => {
    setSelectedPokemon(pokemon); // Armazena o Pokémon selecionado
    setIsModalOpen2(true); // Abre o modal
  };


  useEffect(() => {
    if (selectedPokemon?.name) {
      setName(selectedPokemon.name);
    }
  }, [selectedPokemon]);
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
   
  }
  useEffect(() => {
    if (selectedPokemon?.type) {
      setType(selectedPokemon.type);
    }
  }, [selectedPokemon]);
  const handleTypechange = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value)

  }
  useEffect(() => {
    if (selectedPokemon?.imag) {
      setImag(selectedPokemon.imag);
    }
  }, [selectedPokemon]);
  const handleImagChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Esta função agora será usada para prevenir a entrada de texto pela digitação
    e.preventDefault();
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    // Acessa o texto do clipboard
    const pasteText = e.clipboardData.getData('text');
    // Atualiza o estado com o texto colado
    setImag(pasteText);
  };

  const handleImagClick = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000); // Desativa a mensagem após 3 segundos
  };
  
  const handlePaste2 = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setImag(text);
    } catch (err) {
      console.error('Falha ao colar o conteúdo: ', err);
    }
  };



  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    
    const fetchPokemons = async () => {
      const response = await api.get('/pokemons');
      setPokemons(response.data); 
    };

    fetchPokemons();
  }, []);

  const handleDelete = async (pokemonId: any) => {
    try {
      setIsLoading(true);
      // Simule uma operação assíncrona, como uma chamada de API
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // 2 segundos para o exemplo
      await api.delete(`/pokemons/${pokemonId}`);

      setPokemons(pokemons.filter(pokemon => pokemon.id !== pokemonId));
      //window.location.reload(); 
      setIsModalOpen2(false)
      setIsModalOpen3(true); // Abre o modal
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
    if (!name?.trim()) {
      setError(true)
      setError1(false)
      setError2(false)
      return;
    } 
  

      if (!type?.trim()) {
        setError(false);
        setError1(true);
        setError2(false)
        return; 
      }
  

      if (!imag?.trim()) {
        setError(false)
        setError1(false)
        setError2(true);
        return; 
      }
    

      
      setError(false)
      setError1(false)
      setError2(false)
      e.preventDefault();
     
      
      try {
        setIsLoading(true);
        // Simule uma operação assíncrona, como uma chamada de API
        setTimeout(() => {
          setIsLoading(false);
        }, 2000); // 2 segundos para o exemplo
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
    <div className="pokemon-container" key={pokemon.id} >
      <div>
    <button id='meuBotaoT' onClick={() => handleOpenModal(pokemon)}  ><img src={editar} alt='' style={{ width: '30px', height: 'auto'}} /><span className="tooltip">Editar {pokemon.name}</span></button>
            <img
            
         
            style={{ width: 'auto', height: '90px' }}
            src={pokemon.imag}
            alt={pokemon.name}
           
          />
          
          <button id="meuBotaoT" onClick={() => handleOpenModal2(pokemon)}>
          <span style={{color: "#00FFFF"}} className="tooltip">Deletar {pokemon.name}</span>
            <FaTrash size={18} color="red" />
          </button>
          </div>
          <TextoElegante>{pokemon.name}</TextoElegante>


        </div>
      ))}




      <Modal isOpen={isModalOpen2} onRequestClose={() => setIsModalOpen2(false)}
      style={{
          content: {
            width: '328px', // Define a largura do modal
            height: '262px', // Define a altura do modal
            margin: 'auto', // Centraliza o modal na tela
            backgroundColor: '#38b3d1',
            backgroundSize: 'cover',
            filter: 'brightness(100%)', // Ajusta o brilho da imagem
            overflow: 'hidden',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.20)',
            
          }
        }}> 
        
        <div style={{ 
    width: '328px', // Largura fixa
    height: '262px', // Altura fixa
    margin: 'auto', // Centraliza a div
    display: 'flex', // Utiliza flexbox para organizar o conteúdo
    flexDirection: 'column', // Organiza os filhos em coluna
    justifyContent: 'center', // Centraliza os itens na vertical
    alignItems: 'center', // Centraliza os itens na horizontal
    textAlign: 'center', // Centraliza o texto
    backgroundColor: '#38b3d1', // Um exemplo de cor de fundo
}}>
         <div style={{ textAlign: 'center' }}><TextoElegante>Deseja realmente deletar {selectedPokemon?.name}?</TextoElegante></div>
        <div>
          <img src={selectedPokemon?.imag} style={{ width: '100px', height: 'auto', display: 'block', margin: 'auto',objectFit: 'cover', maxHeight: '150px' }} alt=''/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
        {isLoading && <div id="telaDeCarregamento"> <img src={load} style={{ width: '70px', height: 'auto' }} alt=''/> Carregando...</div>}
          <button id='meuBotaoT' style={{ margin: '10px' }} onClick={() => handleDelete(selectedPokemon?.id)}>
            <TextoElegante3>SIM</TextoElegante3>
          </button>
          <button id='meuBotaoT' style={{ margin: '10px' }} onClick={() => setIsModalOpen2(false)}> 
            <TextoElegante>NÃO</TextoElegante>
          </button>
        </div>

        </div>
      </Modal>

      <Modal isOpen={isModalOpen3} onRequestClose={() => setIsModalOpen3(false)}
      style={{
          content: {
            width: '328px', // Define a largura do modal
            height: '262px', // Define a altura do modal
            margin: 'auto', // Centraliza o modal na tela
            backgroundColor: '#38b3d1',
            backgroundSize: 'cover',
            filter: 'brightness(100%)', // Ajusta o brilho da imagem
            overflow: 'hidden',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.20)',
            
          }
        }}>

          <div style={{ textAlign: 'center' }}><TextoElegante>{selectedPokemon?.name} Deletado com sucesso!!</TextoElegante></div>

          <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
          <button id='meuBotaoT' style={{ margin: '10px' }} onClick={() => setIsModalOpen3(false)}> 
            <TextoElegante4>OK</TextoElegante4>
          </button>
          </div>


             </Modal>





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
        }}><div className="modal-content3">
        <button id="meuBotao" onClick={() => setIsModalOpen(false)}>
          <img src={fechar} alt='' style={{ width: '30px', height: 'auto'}} />
        </button>
        <div style={{ textAlign: 'center' }} className="container2 " >
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
          className={`beautifulInput ${error1 ? 'error1' : ''}`}
          
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
        <div className='input-group'>
   
        <Input
          
          type="text"
          value={imag}
          name="imag"
          error={error2}
          onChange={handleImagChange}
          placeholder="URL da sprite"
          onPaste={handlePaste} // Permitir apenas colar
          onClick={handleImagClick}
          
        />
      <div className='div1'>
      <button id='meuBotao0' type="button" onClick={handlePaste2} className={showMessage ? 'shake-animation' : ''}>
        <img style={{ width: '25px', height: 'auto' }} alt='' src={paste}/>
      </button>

        {showMessage && <div className="error" style={{color:'red'}}><>Clique aqui para substituir a url!!</></div>}
        </div>
        </div>
        {isLoading && <div id="telaDeCarregamento"> <img src={load} style={{ width: '70px', height: 'auto' }} alt='' /> Carregando...</div>}
        <button id="meuBotao"   type="submit"><img style={{ width: '30px', height: 'auto' }} alt='' src={confirm}/></button>



      </form>
      

      <div>
        <img src={imag} style={{ width: '100px', height: 'auto'}} alt=''/>
        
        <div id='header2'>
        <TextoElegante2>{name}</TextoElegante2>
        </div>
        <div id='header2'>
        <TextoElegante2 style={{color: getColorByType(type)}}> {type} </TextoElegante2>
        </div>
      </div>

    </div>
        </div>
      </Modal>
  </div>
  );
};



export default PokemonList;