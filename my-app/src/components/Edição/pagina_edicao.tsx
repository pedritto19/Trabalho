import React, { useState } from 'react';
import "../../styles.css"
import { useNavigate } from 'react-router-dom';
import seta from '../images/seta.png'
import home from '../images/home.png';
import Modal from 'react-modal';
import PokemonList from './modaldelete';
import fechar from '../images/fechar.png';
import editar from '../images/editar.png';
import fundo from '../images/fundo.jpg'
import { TextoElegante } from '../../App';




const Edicao: React.FC = () => {

    
     // definicao de estado para o modal
      const [isModalOpen, setIsModalOpen] = useState(true);
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
      function handleClickhome() {
        navigate('/');
      }
    let navigate = useNavigate();


return (
    <div style={{ textAlign: 'center' }} className="container align-self-center d-flex justify-content-center " >
    <h3><TextoElegante>Tela de Edicao</TextoElegante></h3>
    
    <div className="menu-opcoes" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button id="meuBotaoM"  onClick={handleClickhome}>
          <img src={home} style={{ width: 'auto', height: '40px'}}alt='' />
          <span className="tooltip">Tela de Inicio</span>
        </button>
        <button id="meuBotaoT"  onClick={() => setIsModalOpen(true)} ><img src={editar} style={{ width: 'auto', height: '40px'}} alt=''/><span className="tooltip">Editar</span></button>
        </div>
        <div className="modal-content">
    <Modal 
        isOpen={isModalOpen} // Passa a propriedade isOpen
        onRequestClose={() => setIsModalOpen(false)} // Opcional: Função para fechar o modal
        id='modalId'
        shouldCloseOnOverlayClick={false} // Impede que o modal feche ao clicar fora
        
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
        }}
      >
        <div className="modalContent"  >
        {/* Conteúdo do Modal aqui */}
        <button style={{position: 'fixed'}} id="meuBotaoT" onClick={handleClickhome}><img src={fechar} style={{ width: '30px', height: 'auto'}} alt=''/></button>

        <TextoElegante>Edite seus Pokémons!!</TextoElegante>

        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
        <PokemonList></PokemonList>
        <button id='meuBotaoT' onClick={handleckickb} style={{  textAlign: 'end' }}>
        <img src={seta} style={{ width: '50px', height: 'auto', transform: 'rotate(270deg)'}} alt="" />
        </button>

        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button id='meuBotaoT' onClick={handleGoToTop} style={{ textAlign: 'end' }}>
            <img src={seta} style={{ width: '50px', height: 'auto', transform: 'rotate(90deg)' }} alt="" />
          </button>
        </div>



       



        <button id="meuBotaoT" onClick={handleClickhome}><img src={seta} style={{ width: '50px', height: 'auto'}}alt='' /></button>


        </div>
        
      </Modal>
      </div>


    
  </div>
)

}

export default Edicao


