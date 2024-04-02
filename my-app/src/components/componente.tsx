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
const TextoElegante2 = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
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
        <div style={{ textAlign: 'center' }} className="container" >
          <div>
        <h3><TextoElegante>Bem Vindo</TextoElegante></h3>
        <p><TextoElegante>Pagina inicial</TextoElegante></p>
        
       
          <div className="menu-opcoes">
            <button className='botao-com-texto' id="meuBotao" onClick={handleClick2}>
              <img src={cadastro} alt="Cadastrar" style={{ width: '30px', height: 'auto', transform: 'scaleX(-1)' }} />
              <span><TextoElegante2>Cadastrar Pokémon</TextoElegante2></span>
            </button>
            <button className='botao-com-texto' id="meuBotao" onClick={handleClick4}>
              <img src={edicao} alt="Editar" style={{ width: '30px', height: 'auto', transform: 'scaleX(-1)' }} />
              <span><TextoElegante2>Editar Pokémon</TextoElegante2></span>
            </button>
          </div>
   
      </div>
      </div>
    );
  }
   
   export default Mensagem;





