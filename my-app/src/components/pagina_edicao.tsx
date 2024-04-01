import React, { useState } from 'react';
import "./Header/styles.css";
import { useNavigate } from 'react-router-dom';
import seta from './images/seta.png'
import styled from 'styled-components';
import home from './images/home.png';
import Modal from 'react-modal';
import PokemonList from './modaldelete';
import fechar from './images/fechar.png';
import editar from './images/editar.png';
import fundo from './images/fundo.jpg'
import cadastro from './images/cadastro.png'


const TextoElegante = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: #000000;
  line-height: 1.6;
  text-align: center;
  letter-spacing: 0.5px;
`;


const Edicao: React.FC = () => {

    
    
      const [isModalOpen, setIsModalOpen] = useState(false);



    









    function handleClickback() {
        navigate('/pagina_cadastro'); // Substitua isso pelo seu caminho desejado
      }
      function handleClickhome() {
        navigate('/'); // Substitua isso pelo seu caminho desejado
      }
    let navigate = useNavigate();


return (
    <div style={{ textAlign: 'center' }} className="container align-self-center d-flex justify-content-center " >
    <h3><TextoElegante>Tela de Edicao</TextoElegante></h3>
    <p><TextoElegante></TextoElegante></p>
    <button id="meuBotao"  onClick={handleClickback}>
          <img src={cadastro} style={{ width: '40px', height: 'auto'}} alt='' />
        </button>
        <button id="meuBotao"  onClick={handleClickhome}>
          <img src={home} style={{ width: '30px', height: 'auto'}}alt='' />
        </button>
        <button id="meuBotao"  onClick={() => setIsModalOpen(true)} ><img src={editar} style={{ width: '30px', height: 'auto'}} alt=''/></button>
        <div className="modal-content">
    <Modal 
        isOpen={isModalOpen} // Passa a propriedade isOpen
        onRequestClose={() => setIsModalOpen(false)} // Opcional: Função para fechar o modal
        id='header4'
        
        
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
        
        {/* Conteúdo do Modal aqui */}
        <button id="meuBotao" onClick={() => setIsModalOpen(false)}><img src={fechar} style={{ width: '30px', height: 'auto'}} alt=''/></button>
        <TextoElegante>Edite seus Pokémons!!</TextoElegante>
        <PokemonList></PokemonList>
        <button id="meuBotao" onClick={() => setIsModalOpen(false)}><img src={seta} style={{ width: '50px', height: 'auto'}}alt='' /></button>
        
      </Modal>
      </div>


    
  </div>
)

}

export default Edicao


