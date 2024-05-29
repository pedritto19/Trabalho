import React, {  useState} from 'react';
import { api } from '../../services/api';
import { TextoElegante } from '../../App';
import { TextoElegante3 } from "../../App";
import load from '../images/load.gif';
import { usePokemons } from '../../backend/PokemonContext';


function Modalconfirm({closeModal, selectedPokemon }: any){

    const [isLoading, setIsLoading] = useState(false);
    const {fetchPokemons} = usePokemons();
    const [isDeleted, setIsDeleted] = useState(false);

    const handleDeleteClick = (id: string) => {
       handleDelete(id);
      setIsDeleted(true);
    };
    const handleDelete = async (pokemonId: any) => {
        try {
          setIsLoading(true);
          // Simule uma operação assíncrona, como uma chamada de API
    
          await api.delete(`/pokemons/${pokemonId}`);
          
          //todo: nomear melhor as modais
        
          fetchPokemons();
          setIsLoading(false);
          
    
        } catch (error) {
          //todo: mensagem de erro para o usuário
          console.error("Erro ao deletar o pokémon:", error);
        }
      };

return (
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

    <div style={{ display: 'flex',  width: '100%',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',textAlign: 'center' }}>
      {isLoading && <div id="telaDeCarregamento"> <img src={load} style={{ width: '70px', height: 'auto' }} alt=''/> Carregando...</div>}
      {!isDeleted ? (
        <>
          <div style={{ textAlign: 'center' , position:'relative'}}>
            <TextoElegante>Deseja realmente deletar {selectedPokemon?.name}?</TextoElegante>
          </div>
          <div>
            <img src={selectedPokemon?.imag} style={{ width: '100px', height: 'auto', display: 'block', margin: 'auto', objectFit: 'cover', maxHeight: '150px' }} alt=''/>
          </div>
          <div>
          <button id='meuBotaoT' style={{ margin: '10px' }} onClick={() => handleDeleteClick(selectedPokemon?.id)}>
            <TextoElegante3>SIM</TextoElegante3>
          </button>
          <button id='meuBotaoT' style={{ margin: '10px' }} onClick={closeModal}> 
            <TextoElegante>NÃO</TextoElegante>
          </button>
          </div>
        </>
      ) : (
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
      <div style={{ textAlign: 'center' }}><TextoElegante>{selectedPokemon?.name} Deletado com sucesso!!</TextoElegante></div>
  
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
      <button id='meuBotaoT' style={{ margin: '10px' }} onClick={closeModal}> 
        <TextoElegante>OK</TextoElegante>
      </button>
      </div>
      </div>
      )}
    </div>
  </div>
);
};

export default Modalconfirm


