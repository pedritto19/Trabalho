import React, {  useState} from 'react';
import { FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';
import editar from '../images/editar.png';
import "../../styles.css"
import fundo from '../images/fundo.jpg'
import { TextoElegante } from '../../App';
import { createGlobalStyle } from 'styled-components';
import Editarpkm from './Editarpkm';
import { usePokemons } from '../../backend/PokemonContext';
import Modalconfirm from './Modalconfirm';


interface Pokemon {
  id: string;
  name: string;
  type: string;
  type1: string;
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
  

 




  



  //estados
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isModalConfirmOpen, setIsOpenModalConfirm] = useState(false);
  const { pokemons } = usePokemons();
  //abrir modal com um pokemon
  const handleOpenModal = (pokemon: any) => {
    setSelectedPokemon(pokemon); // Armazena o Pokémon selecionado
    setIsModalOpen(true); // Abre o modal
  };
  //abrir segundo modal com pokemon
  const handleOpenModal2 = (pokemon: any) => {
    setSelectedPokemon(pokemon); // Armazena o Pokémon selecionado
    setIsOpenModalConfirm(true); // Abre o modal
  };







//todo: experimentar unir as 2 modais em 1 componente so
  


  return (
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '20px' }} className="container" id="header4">
      {pokemons.map((pokemon: any) => (
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



      <Modal isOpen={isModalConfirmOpen} onRequestClose={() => setIsOpenModalConfirm(false)}
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
        
        <Modalconfirm
        closeModal={()=>setIsOpenModalConfirm(false)}

        selectedPokemon={selectedPokemon}

        ></Modalconfirm>
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
        }}>  <Editarpkm
        closeModal={() => setIsModalOpen(false)}
        nomepkm={selectedPokemon?.name}
        tipopkm={selectedPokemon?.type}
        tipopkm1={selectedPokemon?.type1}
        imagempkm={selectedPokemon?.imag}
        pkm={selectedPokemon}
      />
      </Modal>
  </div>
  );
};



export default PokemonList;