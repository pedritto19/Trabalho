import React, {  useState} from 'react';
import { api } from '../../services/api';
import { TextoElegante } from '../../App';
import { TextoElegante3 } from "../../App";
import load from '../images/load.gif';
import { usePokemons } from '../../backend/PokemonContext';


function Modalconfirm({closeModal, selectedPokemon, openModal }: any){

    const [isLoading, setIsLoading] = useState(false);
    const {fetchPokemons} = usePokemons();
    const handleDelete = async (pokemonId: any) => {
        try {
          setIsLoading(true);
          // Simule uma operação assíncrona, como uma chamada de API
    
          await api.delete(`/pokemons/${pokemonId}`);
          
          //todo: só refazer a chamada de api fetchPokemons() CC
          //todo: nomear melhor as modais
          openModal()
          closeModal() // Abre o modal
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
             <div style={{ textAlign: 'center' }}><TextoElegante>Deseja realmente deletar {selectedPokemon?.name}?</TextoElegante></div>
            <div>
              <img src={selectedPokemon?.imag} style={{ width: '100px', height: 'auto', display: 'block', margin: 'auto',objectFit: 'cover', maxHeight: '150px' }} alt=''/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            {isLoading && <div id="telaDeCarregamento"> <img src={load} style={{ width: '70px', height: 'auto' }} alt=''/> Carregando...</div>}
              <button id='meuBotaoT' style={{ margin: '10px' }} onClick={() => handleDelete(selectedPokemon?.id)}>
                <TextoElegante3>SIM</TextoElegante3>
              </button>
              <button id='meuBotaoT' style={{ margin: '10px' }} onClick={closeModal}> 
                <TextoElegante>NÃO</TextoElegante>
              </button>
            </div>
    
            </div>


    

)

}

export default Modalconfirm


