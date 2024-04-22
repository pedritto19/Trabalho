import React, { useEffect, useState} from 'react';
import { api } from '../../services/api';
import { FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';
import editar from '../images/editar.png';
import "../../styles.css"
import fundo from '../images/fundo.jpg'
import load from '../images/load.gif'
import { TextoElegante } from '../../App';
import { TextoElegante3 } from '../../App';
import { TextoElegante4 } from '../../App';
import { createGlobalStyle } from 'styled-components';
import Editarpkm from './Editarpkm';




//todo: PokemonS e Pokemon são a mesma coisa

interface Pokemon {
  id: string;
  name: string;
  type: string;
  imag: string; 
}

export const GlobalStyle = createGlobalStyle`
.modalContent {
  overflow-y: auto; /* Habilita a rolagem vertical se necessário */
  max-height: 100%; /* Garante que a div não exceda a altura do modal */
  scrollbar-width: thin !important;
  scrollbar-color: #28e7d7 #92dbd9 !important; /* Cores ajustadas para verde claro e azul claro */
  

  
  /* Garantindo que o texto não ultrapasse a div */
  white-space: nowrap; /* Impede que o texto vá para a próxima linha */
  overflow:visible; /* Esconde qualquer parte do texto que ultrapasse a div */
  text-overflow: ellipsis; /* Adiciona "..." ao final do texto que não couber na div */
}


#modalId {
  scroll-behavior: smooth;
}
`;
const PokemonList = () => {
  

 



  const [isLoading, setIsLoading] = useState(false);

  



  //estados
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
 
 
  //abrir modal com um pokemon
  const handleOpenModal = (pokemon: any) => {
    setSelectedPokemon(pokemon); // Armazena o Pokémon selecionado
    setIsModalOpen(true); // Abre o modal
  };
  //abrir segundo modal com pokemon
  const handleOpenModal2 = (pokemon: any) => {
    setSelectedPokemon(pokemon); // Armazena o Pokémon selecionado
    setIsModalOpen2(true); // Abre o modal
  };





 // efeito para pegar pokemons do banco 
  useEffect(() => {
    //todo: usar return() do useEffect com AbortController(), ver documentação do axios
    const fetchPokemons = async () => {
      const response = await api.get('/pokemons');
      setPokemons(response.data); 
    };

    fetchPokemons();
  }, []);
  // deleta pokemons do banco a partir do seu id
  const handleDelete = async (pokemonId: any) => {
    try {
      setIsLoading(true);
      // Simule uma operação assíncrona, como uma chamada de API

      await api.delete(`/pokemons/${pokemonId}`);
      //todo: só refazer a chamada de api fetchPokemons()
      setPokemons(pokemons.filter(pokemon => pokemon.id !== pokemonId));
      //todo: nomear melhor as modais
      setIsModalOpen2(false)
      setIsModalOpen3(true); // Abre o modal
      setIsLoading(false);

    } catch (error) {
      //todo: mensagem de erro para o usuário
      console.error("Erro ao deletar o pokémon:", error);
    }
  };

  


  return (
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '20px' }} className="container" id="header4">
      {pokemons.map((pokemon) => (
    <div className="pokemon-container" key={pokemon.id} >
      <div>
        <GlobalStyle/>
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



{/* todo: componentizar modal */}
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
{/* todo: componentizar modal */}
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




{/* todo: componentizar modal */}
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
        }}>  <Editarpkm
        closeModal={() => setIsModalOpen(false)}
        nomepkm={selectedPokemon?.name}
        tipopkm={selectedPokemon?.type}
        imagempkm={selectedPokemon?.imag}
        pkm={selectedPokemon}
      />
      </Modal>
  </div>
  );
};



export default PokemonList;