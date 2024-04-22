import "../../styles.css"
import seta from '../images/seta.png'
import PokemonList from './modaldelete';
import fechar from '../images/fechar.png';
import fundo from '../images/fundo.jpg'
import { TextoElegante } from '../../App';




function Edicao({ closeModal}: any){

    
     // definicao de estado para o modal
     //definicao da funcao que rola o modal para cima
      function handleckickb() { 
        var modal = document.getElementById('modalId'); // Certifique-se de que 'modalId' é o ID correto da sua modal
        if (modal) {
          modal.scrollTop = modal.scrollHeight;
        }
      }
      // Definição da função handleGoToTop para manipular o evento de rolagem
      function handleGoToTop() { 
        var modal = document.getElementById('modalId'); 
        if (modal) {
          modal.scrollTop = 0; // Define o scrollTop para 0, rolando a modal para o topo
        }
      }


 
      // funcao para navegar para tela inicial



return (
        <div
          id='modalId'
          style={{
            content: {
              width: '1000px', // Define a largura do modal
              height: '800px', // Define a altura do modal
              margin: 'auto', // Centraliza o modal na tela
              backgroundImage: `url(${fundo})`,
              backgroundSize: 'cover',
              filter: 'brightness(100%)', // Ajusta o brilho da imagem
            },

          }}
        >
                <div className="modalContent"  >
                {/* Conteúdo do Modal aqui */}
                <button style={{position: 'fixed'}} id="meuBotaoT" onClick={closeModal}><img src={fechar} style={{ width: '30px', height: 'auto'}} alt=''/></button>

                <TextoElegante>Edite seus Pokémons!!</TextoElegante>

                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
                <PokemonList></PokemonList>
                <button id='meuBotaoT' onClick={handleckickb} style={{  textAlign: 'end' }}>
                  {/* todo: rotacionar a imagem antes de renderizar */}
                <img src={seta} style={{ width: '50px', height: 'auto', transform: 'rotate(270deg)'}} alt="" />
                </button>

                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button id='meuBotaoT' onClick={handleGoToTop} style={{ textAlign: 'end' }}>
                    <img src={seta} style={{ width: '50px', height: 'auto', transform: 'rotate(90deg)' }} alt="" />
                  </button>
                </div>



              



                <button id="meuBotaoT" onClick={closeModal}><img src={seta} style={{ width: '50px', height: 'auto'}}alt='' /></button>


                </div>
                
        
              </div>


    

)

}

export default Edicao


