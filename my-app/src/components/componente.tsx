import './Header/styles.css'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import edicao from './images/edicao.png'
import cadastro from './images/cadastro.png'


const TextoElegante = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: #000000;
  line-height: 1.6;
  text-align: center;
  letter-spacing: 0.5px;
`;





    function Mensagem() {


    
    

    



    let navigate = useNavigate();


    function handleClick2() {
      navigate('/pagina_cadastro'); 
    }

    function handleClick4() {
      navigate('/pagina_edicao'); 
    }




    return (
        <div style={{ textAlign: 'center' }} className="container1" >
        
          
          <h3><TextoElegante>Bem Vindo</TextoElegante></h3>
        <p><TextoElegante>Página inicial</TextoElegante></p>
        
            <button  id="meuBotaoM" onClick={handleClick2}>
              <img src={cadastro} alt="Cadastrar" style={{ width: 'auto', height: '40px', transform: 'scaleX(-1)' }} />
              <span className="tooltip">Cadastrar Pokémon</span>
            
            </button>
            <button  id="meuBotaoM" onClick={handleClick4}>
              <img src={edicao} alt="Editar" style={{ width: 'auto', height: '40px', transform: 'scaleX(-1)' }} />
              <span className="tooltip">Editar Pokémon</span>
              
            </button>
       
        


   
      

      </div>
    );
  }
   
   export default Mensagem;





