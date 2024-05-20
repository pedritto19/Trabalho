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
import clear from '../images/clear.png';
import SelectType from '../SelectType';


//todo: ver todos da página de edição e aplicar aqui
//todo: basta 1 tipo estar selecionado para poder cadastrar
//todo: bug: tipos iguais sendo selecionados
export function isValidUrl(lnk:string) {
  try {
    new URL(lnk);
    console.log('valido')
    return true;
  } catch (e) {
    console.log('ivalido')
    return false;
  }
}
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
const [type1, setType1] = useState('')
const [imag, setImag] = useState('')
const [error, setError] = useState(false)
const [showMessage, setShowMessage] = useState(false);
const [isLoading, setIsLoading] = useState(false);






const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
  setName(e.target.value)
}
const handleTypechange = (e: ChangeEvent<HTMLSelectElement>) => {
  setType1('');
  setType(e.target.value)
}
const handleType1change = (e: ChangeEvent<HTMLSelectElement>) => {
  setType1(e.target.value)
}
const handlePastechange = (e: ChangeEvent<HTMLInputElement> | React.ClipboardEvent<HTMLInputElement>) => {
  // Verifica se o evento é de colagem
  if (e.type === 'paste') {
    e.preventDefault();
    const event = e as React.ClipboardEvent<HTMLInputElement>;
    const pasteText = event.clipboardData.getData('text');
    setImag(pasteText);
  }
  // Se não for evento de colagem (ou seja, é evento de mudança de input), prevenir a ação padrão
  else if (e.type === 'change') {
    e.preventDefault();
  }
};
//todo: mudar handlePaste2 pra handleImage
//todo: erro ao gerar imagem
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
    return;
  } 

    // Validação para 'type'
    if (!type.trim()) {
      setError(true)
      return; 
    }

    if (type === type1) {
      setError(true);
      return;
    }
    

    // Validação para 'Imag'
    if (!imag.trim() || !validade) {
      setError(true)
      return; 
    }



  if (!name.trim() || !type.trim() || !imag.trim()) {

    return;
  }
  setIsLoading(true);

  try {
   


    //cria um pokemon no banco
    const response = await api.post('/pkm', { name, type,type1, imag });
    
    console.log('Pokemon criado:', response.data);
    //todo: remover reload(), tentar outra chamada da api ou melhor
    setName('');
    setImag('');
    setType('');
    setType1('');
    setError(false);
  } catch (error) {
    console.error("Erro ao enviar o Pokémon:", error);
  }
  setIsLoading(false);






}




const validade = isValidUrl(imag)


return (
    <div style={{ textAlign: 'center' }} >
      
      <form onSubmit={handleSubmit}>
        
        <h3 className="form-title"><TextoElegante>Cadastro</TextoElegante></h3>
        {/* todo: componentizar input */}
   
        <Input
          type="text"
          value={name}
          name="name"
          error={!name && error}
          onChange={handleNameChange}
          placeholder="Nome"
          style={{ width: 'calc(40% - 1px)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '240px', textAlign: 'center' }}>
          <SelectType
            value={type}
            onChange={handleTypechange}
            error={(type === type1) && error}
            style={{ width: 'calc(184% - 1px)' }}
          />
          <SelectType
            value={type1}
            onChange={handleType1change}
            error={(type1 === type) && error}
            disabled={!type}
            style={{ width: 'calc(180% - 1px)' ,marginLeft: '-78%'}}
          />
        </div>


        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <div style={{ width: '90%', maxWidth: '737px', position: 'relative' }}> 
            <Input
              type="text"
              value={imag}
              name="imag"
              error={((!validade && error) || (!imag && error))}
              onChange={handlePastechange}
              placeholder="URL da sprite"
              onPaste={handlePastechange}
              onClick={handleImagClick}
              style={{ width: '73%' }} // Ajuste para que o Input ocupe todo o espaço disponível
            />
            {imag && (
              <button
                onClick={() => setImag('')}
                style={{
                  position: 'absolute',
                  right: '60px', // Posiciona o botão à direita, dentro do contêiner
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                }}
              >
                <img style={{ width: '25px', height: 'auto' }} src={clear} alt='limpar conteúdo'/>
              </button>
            )}
          </div>
        </div>
      <div className='div1'>
      <button id='meuBotaoT' type="button" onClick={handlePaste2} className={showMessage ? 'shake-animation' : ''}>
        <span className="tooltip">Colar Url</span>
        <img style={{ width: '25px', height: 'auto' }} src={paste} alt=''/>
      </button>

        {showMessage && <div className="error" style={{color:'red'}}><>Clique aqui para colar uma url!!</></div>}
        </div>
        
     
        

    
        
        

      
      
        <div>
  <img src={imag} style={{ width: '100px', height: 'auto'}} alt=''/>
  
  <div className='header2'>
    <TextoElegante2>{name}</TextoElegante2>
  </div>
  <div className='type-container'>
    {type && (
      <span style={{
        backgroundColor: getColorByType(type),
        color: '#FFFFFF',
        padding: '5px 10px',
        borderRadius: '5px',
        fontSize: '15px',
        
        display: 'inline-block', // Isso faz com que o elemento seja exibido em linha
      }}>
        {type}
      </span>
    )}
    {type1 && (
      <span style={{
        backgroundColor: getColorByType(type1),
        color: '#FFFFFF',
        padding: '5px 10px',
        borderRadius: '5px',
        fontSize: '15px',
        display: 'inline-block', // Isso também aplica o estilo de exibição em linha
      }}>
        {type1}
      </span>
    )}
  </div>
</div>
      <div className="menu-opcoes" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',paddingTop: '30px' }}>
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
