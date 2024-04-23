import React, { useState , FormEvent, ChangeEvent} from 'react';
import { api } from '../../services/api';
import fechar from '../images/fechar.png';
import Input from '../input'
import confirm from '../images/confirm.png'
import "../../styles.css"
import fundo from '../images/fundo.jpg'
import paste from '../images/paste.png';
import load from '../images/load.gif'
import { getColorByType } from '../../App';
import { TextoElegante } from '../../App';
import { TextoElegante2 } from '../../App';
import clear from '../images/clear.png';


  interface PokemonS {
    id: string;
    name: string;
    type: string;
    imag: string;
  }
  
//todo: qual é nomepkm? tipopkm? CC
function Editarpkm({ closeModal, nomepkm, tipopkm, imagempkm,pkm }: any){

   
//todo: um tipo de erro CC
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false);





  //estados
  const [selectedPokemon] = useState<PokemonS | null>(pkm);
  const [name, setName] = useState(nomepkm)
  const [type, setType] = useState(tipopkm)
  const [imag, setImag] = useState(imagempkm)
  const [showMessage, setShowMessage] = useState(false);
 
 


  // efeito de selecionar nome do pokemon
  //todo: passar via parâmetro ao abrir modal CC

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
   
  }
  //efeito de selecionar tipo do pokemon

  const handleTypechange = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value)

  }




  //todo: otimizar o ato de colar imagem e a mensagem de erro CC
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
// mensagem de erro da url
//todo: melhorar visualização e inserir botão de limpar o input
  const handleImagClick = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000); // Desativa a mensagem após 3 segundos
  };
  // salvar texto colado
  const handlePaste2 = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setImag(text);
    } catch (err) {
      console.error('Falha ao colar o conteúdo: ', err);
    }
  };

//todo: verificar se a imagem é válida (se tem output)

  
  const updatedPokemon = {
    name: name || selectedPokemon?.name, 
    type: type || selectedPokemon?.type,
    imag: imag || selectedPokemon?.imag,
  };
  // submissao do formulario
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name?.trim()) {
      setError(true)
      return;
    } 
  

      if (!type?.trim()) {
        setError(true);
        return; 
      }
  

      if (!imag?.trim()) {
        setError(true)
        return; 
      }
    

      

     
      
      try {
        setIsLoading(true);
        // Simule uma operação assíncrona, como uma chamada de API

        const response = await api.put(`/pokemonsup/${selectedPokemon?.id}`, updatedPokemon);
        if (response.status === 200) {
          console.log('Pokémon atualizado com sucesso:', response.data);
          //todo: remover reload(), tentar outra chamada da api ou melhor
          window.location.reload(); 
          
       
        }
      } catch (error) {
        console.error('Erro ao atualizar o Pokémon:', error);
      }
      setIsLoading(false);

    };


    return (
      <div style={{ 
        width: '1000px', // Define a largura
        height: '800px', // Define a altura
        margin: 'auto', // Centraliza na tela
        backgroundImage: `url(${fundo})`,
        backgroundSize: 'cover',
        filter: 'brightness(100%)', // Ajusta o brilho da imagem
        position: 'fixed', // Faz a div se comportar como um modal

        zIndex: 2, // Garante que a div fique acima de outros elementos
        overflow: 'auto', // Adiciona scroll se necessário
        backgroundColor: 'rgba(0, 0, 0, 0.20)', // Fundo escurecido
      }}>
        <div className="modal-content3">
          <button id="meuBotaoT" onClick={closeModal}>
            <img src={fechar} alt='' style={{ width: '30px', height: 'auto'}} />
          </button>
          <div style={{ textAlign: 'center' }} className="container2">
          <form onSubmit={handleSubmit}>
        <h3 className="form-title"><TextoElegante>Editar</TextoElegante></h3>
        <Input
          type="text"
          defaultValue={selectedPokemon?.name}
          value={name}
          name="name"
          error={error}
          onChange={handleNameChange}
          placeholder={selectedPokemon?.name}
        />
        {/*todo: componetizar o select */}
        <select
          name="type"
          value={type}
          
          onChange={handleTypechange}
          className={`beautifulInput ${error ? 'error' : 'Preencha o campo!!'}`}
          
        >
          <option value={selectedPokemon?.type} >{selectedPokemon?.type}</option>
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
          error={error}
          onChange={handlePastechange}
          placeholder="URL da sprite"
          onPaste={handlePastechange} // Permitir apenas colar
          onClick={handleImagClick}
          
        />
                      {imag && (
        <button
          onClick={() => setImag('')}
          style={{
            position: 'absolute',
            right: '28.5%',
            top: '39.5%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            background: 'transparent',
            border: 'none',
          }}
        >
          <img style={{ width: '25px', height: 'auto' }} alt='' src={clear}/>
        </button>
      )}

      <div className='div1'>
      <button id='meuBotaoT' type="button" onClick={handlePaste2} className={showMessage ? 'shake-animation' : ''}>
        <img style={{ width: '25px', height: 'auto' }} alt='' src={paste}/>
      </button>

        {showMessage && <div className="error" style={{color:'red'}}><>Clique aqui para substituir a url!!</></div>}
        </div>
        </div>
        {isLoading && <div id="telaDeCarregamento"> <img src={load} style={{ width: '70px', height: 'auto' }} alt='' /> Carregando...</div>}
        <button style={{paddingTop: 30}} id="meuBotaoT"   type="submit"><img style={{ width: '30px', height: 'auto' }} alt='' src={confirm}/></button>



      </form>
      <div>
                {/*todo: nomear melhor imports, como imag */}
        <img src={imag} style={{ width: '100px', height: 'auto'}} alt=''/>
        
        <div id='header2'>
        <TextoElegante2>{name}</TextoElegante2>
        </div>
        <div id='header2'>
        <TextoElegante2 style={{color: getColorByType(type)}}> {type} </TextoElegante2>
        </div>
      </div>
          </div>
        </div>
    </div>
  
    );
  }
  export default Editarpkm;