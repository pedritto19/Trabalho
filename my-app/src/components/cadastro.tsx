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
  setImag(e.target.value)
}

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
        <Input
          type="text"
          value={imag}
          name="imag"
          error={error2}
          onChange={handleImagChange}
          placeholder="URL da sprite"
        />

        <div>
        <button id="meuBotao"   onClick={handleClickback}>
          <img src={seta} style={{ width: '30px', height: 'auto'}} />
        </button>
      {isLoading && <div id="telaDeCarregamento"> <img src={load} style={{ width: '70px', height: 'auto' }} /> Carregando...</div>}
      <button id="meuBotao" type="submit" disabled={isButtonDisabled || isLoading} onClick={handleClick}>
        <img style={{ width: '30px', height: 'auto' }} src={confirm}/>
      </button>
      <button id="meuBotao"   onClick={handleClickedicao}><img style={{ width: '30px', height: 'auto' , transform:'scaleX(-1)'}} src={seta}/></button>
    </div>
    
        
        

      </form>
      
      <div>
        <img src={imag} style={{ width: '100px', height: 'auto'}}/>
        
        <div id='header2'>
        <TextoElegante2>{name}</TextoElegante2>
        </div>
        <div id='header2'>
        <TextoElegante2>{type}</TextoElegante2>
        </div>
      </div>

    </div>
    
  )
}
export default Cadastro
