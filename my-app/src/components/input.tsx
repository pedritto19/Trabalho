import { ChangeEvent, FC } from 'react'
import styled from 'styled-components';


const TextoElegante = styled.p`
  font-family: 'Roboto Mono', monospace;
  font-size: 15px;
  font-weight: 700;
  color: #db5151;
  line-height: 1.6;
  text-align: center;
  letter-spacing: 0.5px;
`;


interface InputProps {
  type: 'text' | 'number' | 'email' | 'password'
  value: string | number
  defaultValue?: string;
  name: string
  placeholder: string
  error: boolean
  disabled?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({
  type,
  value,
  name,
  placeholder,
  error,
  disabled,
  onChange,
}) => {
  return (
    <div className="input-wrapper">
     
      <input
        className={`beautifulInput ${error ? 'error' : ''}`}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <p className="error"><TextoElegante>Preencha o Campo!</TextoElegante></p>}
    </div>
  )
}

export default Input