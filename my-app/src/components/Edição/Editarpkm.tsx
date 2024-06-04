import React, { useState , FormEvent, ChangeEvent} from 'react';
import { api } from '../../services/api';
import fechar from '../images/fechar.png';
import Input from '../interfaces/input'
import confirm from '../images/confirm.png'
import "../../styles.css"
import fundo from '../images/fundo.jpg'
import paste from '../images/paste.png';
import load from '../images/load.gif'
import { getColorByType } from '../../App';
import { TextoElegante } from '../../App';
import { TextoElegante2 } from '../../App';
import clear from '../images/clear.png';
import { usePokemons } from '../../backend/PokemonContext';
import { isValidUrl } from '../Cadastro/cadastro';
import SelectType from '../interfaces/SelectType';
  interface PokemonS {
    id: string;
    name: string;
    type: string;
    type1: string;
    imag: string;
  }
  

function Editarpkm({ closeModal, nomepkm, tipopkm,tipopkm1, imagempkm,pkm }: any){

   
//todo: personalizar error
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false);





  //estados
  const [selectedPokemon] = useState<PokemonS | null>(pkm);
  const [name, setName] = useState(nomepkm)
  const [type, setType] = useState(tipopkm)
  const [type1, setType1] = useState(tipopkm1)
  const [imag, setImag] = useState(imagempkm)
  const [showMessage, setShowMessage] = useState(false);



  // efeito de selecionar nome do pokemon
  //todo: passar via parâmetro ao abrir modal CC

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
   
  }
  //efeito de selecionar tipo do pokemon

  const handleTypechange = (e: ChangeEvent<HTMLSelectElement>) => {
    //todo: limpar type1 apenas se type não tiver mais seleção
    if (e.target.value === '') {
      setType1('');
    }
    setType(e.target.value)
  }
  const handleType1change = (e: ChangeEvent<HTMLSelectElement>) => {
    setType1(e.target.value)
  }




  //todo: otimizar o ato de colar imagem e a mensagem de erro
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
//todo: melhorar visualização
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
    type1: type1 || selectedPokemon?.type1,
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
  

    // Validação para 'Imag'
    if (!imag.trim() || !validade) {
      setError(true)
      return; 
    }

      

     
      
      try {
        setIsLoading(true);
        // Simule uma operação assíncrona, como uma chamada de API

        const response = await api.put(`/pokemonsup/${selectedPokemon?.id}`, updatedPokemon);
        if (response.status === 200) {
          console.log('Pokémon atualizado com sucesso:', response.data);
          fetchPokemons()
          closeModal();
          
        }
      } catch (error) {
        console.error('Erro ao atualizar o Pokémon:', error);
      }
      setIsLoading(false);

    };
const {fetchPokemons} = usePokemons()
const validade = isValidUrl(imag)
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
          value={name}
          name="name"
          error={!name && error}
          onChange={handleNameChange}
          placeholder="Nome"
          style={{ width: 'calc(56% - 1px)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '240px', textAlign: 'center' }}>
          {/* todo: deixar igual aos inputs do cadastro */}
          <SelectType
            value={type}
            onChange={handleTypechange}
            error={error}
            style={{ width: 'calc(184% - 1px)' }}
          />
          <SelectType
            value={type1}
            onChange={handleType1change}
            error={false}
            disabled={!type}
            style={{ width: 'calc(180% - 1px)' ,marginLeft: '-78%'}}
          />
        </div>
        <div className='input-group'>
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
                  right: '10px', // Posiciona o botão à direita, dentro do contêiner
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
        <img style={{ width: '25px', height: 'auto' }} alt='' src={paste}/>
      </button>

        {showMessage && <div className="error" style={{color:'red'}}><>Clique aqui para substituir a url!!</></div>}
        </div>
        </div>
        {isLoading && <div id="telaDeCarregamento"> <img src={load} style={{ width: '70px', height: 'auto' }} alt='' /> Carregando...</div>}
        <button style={{paddingTop: 30}} id="meuBotaoT"   type="submit"><img style={{ width: '30px', height: 'auto' }} alt='' src={confirm}/></button>



      </form>
      <div>
        <img src={imag} style={{ width: '100px', height: 'auto'}} alt='spritepokemon'/>
        
        <div id='header2'>
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
          </div>
        </div>
    </div>
  
    );
  }
  export default Editarpkm;