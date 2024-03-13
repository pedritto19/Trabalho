import React, { ChangeEvent, FormEvent, useState } from 'react'
import Input from './input'
import "./Header/styles.css"
import { useNavigate } from 'react-router-dom';
import confirm from './images/confirm.png'

const Cadastro: React.FC = () => {
  let navigate = useNavigate();

  function handleClick() {
    navigate('/pagina_cadastro'); // Substitua isso pelo seu caminho desejado
  }

const [name, setName] = useState('')
const [type, setType] = useState('')
const [imag, setImag] = useState('')
const [error, setError] = useState(false)

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
  } else {
    setError(false)
  }
}


  
return (
    <div style={{ textAlign: 'center' }} className="container align-self-center d-flex justify-content-center" id="container-home">
      <form onSubmit={handleSubmit}>
        <h3 className="form-title">Login</h3>
        <Input
          type="text"
          label="Name"
          value={name}
          name="name"
          error={error}
          onChange={handleNameChange}
          placeholder="Nome"
        />
        <Input
          type="text"
          label="Type"
          value={type}
          name="name"
          error={error}
          onChange={handleTypechange}
          placeholder="Tipo"
        />
        <Input
          type="text"
          label="URL imagem"
          value={imag}
          name="name"
          error={error}
          onChange={handleImagChange}
          placeholder="Tipo"
        />
        <button type="submit" onClick={handleClick}><img style={{ width: '30px', height: 'auto' }} src={confirm}/></button>
      </form>
    </div>
  )
}
export default Cadastro
