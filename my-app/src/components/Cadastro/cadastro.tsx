import React, { ChangeEvent, FormEvent, useState } from 'react'
import Input from '../input'
import '../../styles.css'
import { useNavigate } from 'react-router-dom';
import confirm from '../images/confirm.png'
import { api } from '../../services/api';
import load from '../images/load.gif'
import home from '../images/home.png';
import paste from '../images/paste.png';
import { getColorByType } from '../../App';
import { TextoElegante } from '../../App';
import { TextoElegante2 } from '../../App';







const Cadastro: React.FC = () => {







  let navigate = useNavigate();

  function handleClick() {
    navigate('/pagina_cadastro'); 
  }
  function handleClickback() {
    navigate('/'); 
  }
 

//estados
const [name, setName] = useState('') 
const [type, setType] = useState('')
const [imag, setImag] = useState('')
const [error, setError] = useState(false)
const [error1, setError1] = useState(false)
const [error2, setError2] = useState(false)
const [showMessage, setShowMessage] = useState(false);
const [isLoading, setIsLoading] = useState(false);





const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
  setName(e.target.value)
}
const handleTypechange = (e: ChangeEvent<HTMLSelectElement>) => {
  setType(e.target.value)
}
const handleImagChange = (e: ChangeEvent<HTMLInputElement>) => {
  // Esta função é usada para prevenir a entrada de texto pela digitação
  e.preventDefault();
};

const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {//ler conteudo da area de transferencia quando clicar no botao
  // Acessa o texto do clipboard
  const pasteText = e.clipboardData.getData('text');
  // Atualiza o estado com o texto colado
  setImag(pasteText);
};

const handlePaste2 = async () => { //colar conteudo da area de transferencia quando clicar no botao
  try {
    const text = await navigator.clipboard.readText();
    setImag(text);
  } catch (err) {
    console.error('Falha ao colar o conteúdo: ', err);
  }
};
const handleImagClick = () => {
  setShowMessage(true);
  setTimeout(() => setShowMessage(false), 3000); // Desativa a mensagem após 3 segundos
};



const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { // submissao do form
  
  e.preventDefault()
  if (!name.trim()) {
    setError(true)
    setError1(false)
    setError2(false)
    return;
  } 

    // Validação para 'type'
    if (!type.trim()) {
      setError(false)
      setError1(true);
      setError2(false)
      return; 
    }

    // Validação para 'Imag'
    if (!imag.trim()) {
      setError(false)
      setError1(false)
      setError2(true);
      return; 
    }


    setError(false)
    setError1(false)
    setError2(false)
    e.preventDefault();
  if (!name.trim() || !type.trim() || !imag.trim()) {

    return;
  }

  try {
    setIsLoading(true);
   
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 segundos para o exemplo

    //cria im pokemon no banco
    const response = await api.post('/pkm', { name, type, imag });
    console.log('Pokemon criado:', response.data);
    window.location.reload();
 
  } catch (error) {
    console.error("Erro ao enviar o Pokémon:", error);
  }






}





return (
    <div style={{ textAlign: 'center' }} >
      
      <form onSubmit={handleSubmit}>
        
        <h3 className="form-title"><TextoElegante>Cadastro</TextoElegante></h3>
        
        <Input
          type="text"
          
          value={name}
          name="name"
          error={error}
          onChange={handleNameChange}
          placeholder="Nome"
        />
        <select
          name="type"

          value={type}
          onChange={handleTypechange}
          className={`beautifulInput ${error ? 'error' : ''}`}
          {...error1 && <span>{error1}</span>}
        >
          <option value="" disabled>Escolha um tipo</option> 
          <option value="Normal">Normal</option>
          <option value="Fire">Fire</option>
          <option value="Water">Water</option>
          <option value="Grass">Grass</option>
          <option value="Flying">Flying</option>
          <option value="Fighting">Fighting</option>
          <option value="Electric">Electric</option>
          <option value="Ground">Ground</option>
          <option value="Rock">Rock</option>
          <option value="Psychic">Psychic</option>
          <option value="Ice">Ice</option>
          <option value="Bug">Bug</option>
          <option value="Ghost">Ghost</option>
          <option value="Steel">Steel</option>
          <option value="Dragon">Dragon</option>
          <option value="Dark">Dark</option>
          <option value="Fairy">Fairy</option>
       
        </select>
        <div className='input-group'>
   
        <Input
          
          type="text"
          value={imag}
          name="imag"
          error={error2}
          onChange={handleImagChange}
          placeholder="URL da sprite"
          onPaste={handlePaste} // Permitir apenas colar
          onClick={handleImagClick}
          
        />
      <div className='div1'>
      <button id='meuBotaoT' type="button" onClick={handlePaste2} className={showMessage ? 'shake-animation' : ''}>
        <span className="tooltip">Colar Url</span>
        <img style={{ width: '25px', height: 'auto' }} src={paste} alt=''/>
      </button>

        {showMessage && <div className="error" style={{color:'red'}}><>Clique aqui para colar uma url!!</></div>}
        </div>
        </div>
     
        

    
        
        

      
      
      <div>
        <img src={imag} style={{ width: '100px', height: 'auto'}}alt=''/>
        
        <div id='header2'>
        <TextoElegante2>{name}</TextoElegante2>
        </div>
        <div id='header2'>
        <TextoElegante2 style={{color: getColorByType(type)}}> {type} </TextoElegante2>
        </div>
      </div>
      <div className="menu-opcoes" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div>   
            
          </div>
        <button style={{paddingRight:80}} id="meuBotaoT"   onClick={handleClickback}> 
          <span className="tooltip">Tela de Inicio</span>
          <img src={home} style={{ width: 'auto', height: '40px'}}alt='' />
        </button>
      {isLoading && <div id="telaDeCarregamento"> <img src={load} style={{ width: '70px', height: 'auto' }} alt=''/> Carregando...</div>}
      <button style={{paddingRight: 2}} id="meuBotaoT" type="submit"  onClick={handleClick}>
        <span className="tooltip">Salvar</span>
        <img style={{ width: 'auto', height: '40px' }} src={confirm}alt=''/>
      </button>
      
  
      
    </div>
    </form> 

    </div>
    
  )
}
export default Cadastro