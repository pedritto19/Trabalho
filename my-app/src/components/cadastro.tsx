import React, { ChangeEvent, FormEvent, useState } from 'react'
import Input from './input'


const Cadastro: React.FC = () => {

const [name, setName] = useState('')
const [error, setError] = useState(false)

const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
  setName(e.target.value)
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
    <div className="container align-self-center d-flex justify-content-center" id="container-home">
      <form onSubmit={handleSubmit}>
        <h3 className="form-title">Login Form</h3>
        <Input
          type="text"
          label="Name"
          value={name}
          name="name"
          error={error}
          onChange={handleNameChange}
          placeholder="Preencha seu Nome"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
export default Cadastro
