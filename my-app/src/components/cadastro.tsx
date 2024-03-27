import React, { ChangeEvent, FormEvent, useState,DetailedHTMLProps, SelectHTMLAttributes } from 'react'
import Input from './input'
import "./Header/styles.css"
import { useNavigate } from 'react-router-dom';
import confirm from './images/confirm.png'
import seta from './images/seta.png'
import styled from 'styled-components';
import edicao from './images/edicao.png'
import prisma from '../prisma/index';
import { Createpkmserver } from '../services/Createpkmserver';
import { api } from '../services/api';
import { useEffect} from 'react';
import {FaTrash} from 'react-icons/fa';
import App from '../App';
import load from './images/load.gif'
import home from './images/home.png';
import editar from './images/editar.png';
import paste from './images/paste.png';



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
const TextoElegante3 = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 10px;
  color: #000000;
  line-height: 1.6;
  text-align: center;
  letter-spacing: 0.5px;
`;


function getColorByType(type: string) {
  const colors: { [key: string]: string } = {
    'Normal': "#808080",
    'Fire': "#FF0000",
    'Water': "#0000FF",
    'Grass': "#008000",
    'Flying': "#ADD8E6",
    'Fighting': "#FF8C00",
    'Electric': "#FFFF00",
    'Ground': "#A52A2A",
    'Rock': "#654321",
    'Psychic': "#FFC0CB",
    'Ice': "#AFEEEE",
    'Bug': "#006400",
    'Ghost': "#800080",
    'Steel': "#C0C0C0",
    'Dragon': "#FF4500",
    'Dark': "#000000",
    'Fairy': "#FFB6C1" 
    
  };

  return colors[type] || "#FFB6C1"; 
}




const Cadastro: React.FC = () => {
  interface pokemons {
    id: string;
    name: string;
    imag: string; 
    type: string; 
  }


  interface CustomSelectProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    error?: string; 
  }

  const [pokemons, setPokemons] = useState([]);

  
  useEffect(() => {
    const fetchPokemons = async () => { 
      const response = await api.get('/pokemons');
      setPokemons(response.data); 
    };

    fetchPokemons();
  }, []);

let isEditingPage=false;

  let navigate = useNavigate();

  function handleClick() {
    navigate('/pagina_cadastro'); 
  }
  function handleClickback() {
    navigate('/'); 
  }
  function handleClickedicao() {
    navigate('/pagina_edicao'); 
  }


const [name, setName] = useState('')
const [type, setType] = useState('')
const [imag, setImag] = useState('')
const [error, setError] = useState(false)
const [error1, setError1] = useState(false)
const [error2, setError2] = useState(false)

const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
  setName(e.target.value)
}
const handleTypechange = (e: ChangeEvent<HTMLSelectElement>) => {
  setType(e.target.value)
}
const handleImagChange = (e: ChangeEvent<HTMLInputElement>) => {
  // Esta função agora será usada para prevenir a entrada de texto pela digitação
  e.preventDefault();
};

const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
  // Acessa o texto do clipboard
  const pasteText = e.clipboardData.getData('text');
  // Atualiza o estado com o texto colado
  setImag(pasteText);
};

const handlePaste2 = async () => {
  try {
    const text = await navigator.clipboard.readText();
    setImag(text);
  } catch (err) {
    console.error('Falha ao colar o conteúdo: ', err);
  }
};



const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  
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
    // Simule uma operação assíncrona, como uma chamada de API
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 segundos para o exemplo


    const response = await api.post('/pkm', { name, type, imag });
    console.log('Pokemon criado:', response.data);
    window.location.reload(); 
 
  } catch (error) {
    console.error("Erro ao enviar o Pokémon:", error);
  }






}
const [isButtonDisabled, setIsButtonDisabled] = useState(false);
const [isLoading, setIsLoading] = useState(false);



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
          
        />
      <div className='div1'>
        <button id='meuBotao0' type="button" onClick={handlePaste2}> <img style={{ width: '25px', height: 'auto' }} src={paste}/><span></span></button>
        </div>
        </div>
     
        
        <div className='div2'>
          <div>   
            
          </div>
        <button id="meuBotao"   onClick={handleClickback}>
          <img src={home} style={{ width: '30px', height: 'auto'}} />
        </button>
      {isLoading && <div id="telaDeCarregamento"> <img src={load} style={{ width: '70px', height: 'auto' }} /> Carregando...</div>}
      <button id="meuBotao" type="submit" disabled={isButtonDisabled || isLoading} onClick={handleClick}>
        <img style={{ width: '30px', height: 'auto' }} src={confirm}/>
      </button>
      
      <button id="meuBotao"   onClick={handleClickedicao}><img style={{ width: '30px', height: 'auto' , transform:'scaleX(-1)'}} src={editar}/></button>
      
    </div>
    
        
        

      </form> 
      
      <div>
        <img src={imag} style={{ width: '100px', height: 'auto'}}/>
        
        <div id='header2'>
        <TextoElegante2>{name}</TextoElegante2>
        </div>
        <div id='header2'>
        <TextoElegante2 style={{color: getColorByType(type)}}> {type} </TextoElegante2>
        </div>
      </div>

    </div>
    
  )
}
export default Cadastro
