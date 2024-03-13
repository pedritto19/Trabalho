import React, { ChangeEvent, FormEvent, useState } from 'react'
import Input from './input'
import "./Header/styles.css"
import { useNavigate } from 'react-router-dom';
import confirm from './images/confirm.png'
import seta from './images/seta.png'
import styled from 'styled-components';


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

let foto = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPpTgkKwzgL_HV-VS88idnFVnK0KL3tWbTJaNB2A8blQ&s`;

const Cadastro: React.FC = () => {
  let navigate = useNavigate();

  function handleClick() {
    navigate('/pagina_cadastro'); // Substitua isso pelo seu caminho desejado
  }
  function handleClickback() {
    navigate('/'); // Substitua isso pelo seu caminho desejado
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
const handleTypechange = (e: ChangeEvent<HTMLInputElement>) => {
  setType(e.target.value)
}
const handleImagChange = (e: ChangeEvent<HTMLInputElement>) => {
  setImag(e.target.value)
}

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
  
}


  
return (
    <div style={{ textAlign: 'center' }} className="container align-self-center d-flex justify-content-center" id="header">
      <form onSubmit={handleSubmit}>
        <h3 className="form-title"><TextoElegante>Login</TextoElegante></h3>
        <Input
          type="text"
          
          value={name}
          name="name"
          error={error}
          onChange={handleNameChange}
          placeholder="Nome"
        />
        <Input
        
          type="text"
          value={type}
          name="name"
          error={error1}
          onChange={handleTypechange}
          placeholder="Tipo"
        />
        <Input
          type="text"
          value={imag}
          name="name"
          error={error2}
          onChange={handleImagChange}
          placeholder="URL da sprite"
        />
        <button onClick={handleClickback}>
          <img src={seta} style={{ width: '30px', height: 'auto'}} />
        </button>
        <button type="submit" onClick={handleClick}><img style={{ width: '30px', height: 'auto' }} src={confirm}/></button>

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
