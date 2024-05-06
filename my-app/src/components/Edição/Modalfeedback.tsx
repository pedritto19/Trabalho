import { TextoElegante } from '../../App';
import { TextoElegante4 } from '../../App';


function Modalfeedback({closeModal, selectedPokemon }: any){



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
    <div style={{ textAlign: 'center' }}><TextoElegante>{selectedPokemon?.name} Deletado com sucesso!!</TextoElegante></div>

    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
    <button id='meuBotaoT' style={{ margin: '10px' }} onClick={closeModal}> 
      <TextoElegante4>OK</TextoElegante4>
    </button>
    </div>
    </div>


    

)

}

export default Modalfeedback


