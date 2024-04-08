import './Header/styles.css'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import edicao from './images/edicao.png'
import cadastro from './images/cadastro.png'
import favicon from './images/favicon.png'
import pesquisa from './images/pesquisa.png'

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
        
        
          <h3 style={{display: 'flex', alignItems: 'center', margin: '10px 0' }}><img src={favicon} style={{ width: 'auto', height: '40px'}}alt='' /></h3>
        <h3 style={{display: 'flex', alignItems: 'center', padding: '0px', margin: '0 0px' }}><TextoElegante>ポケモン</TextoElegante></h3>
        <div style={{ display: 'flex', alignItems: 'center',padding: '0px', margin: '0 20px' }}>
            <button  id="meuBotaoT" onClick={handleClick2} style={{ padding: '0px', margin: '0px 50px 0 50px' }}>
              <img src={cadastro} alt="Cadastrar" style={{ width: 'auto', height: '35px'}} />
              <span className="tooltip">Cadastrar Pokémon</span>
            
            </button>
            <button  id="meuBotaoT" onClick={handleClick4} style={{ padding: '0px', margin: '0 1px' }}>
              <img src={edicao} alt="Editar" style={{ width: 'auto', height: '35px' }} />
              <span className="tooltip">Editar Pokémon</span>
              
            </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '100px', gap: '10px', marginLeft: 'auto' }}>
              <button id='meuBotaoT' style={{ padding: '0px' }}><img style={{ width: 'auto', height: '30px' }} src={pesquisa}alt=''/></button>
              <input className={'beautifulInput'} type="search" placeholder="Pesquisar Pokémon..." style={{ padding: '10px', width: '200px' }} />
            </div>
       
        


   
      

      </div>
    );
  }
   
   export default Mensagem;





