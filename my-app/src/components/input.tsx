import { ChangeEvent, FC } from 'react'
import styled from 'styled-components';


const TextoElegante = styled.p`
  font-family: 'Roboto Mono', monospace;
  font-size: 15px; // Tamanho padrão
  font-weight: 700;
  color: #db5151;
  line-height: 1.6;
  text-align: center;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 13px; // Tamanho menor para dispositivos com largura até 768px
  }
`;

// Estilos globais para o input
const GlobalStyle = styled.div`
  .input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .beautifulInput {
    font-size: 16px; // Tamanho padrão
    padding: 10px; // Padding padrão

    @media (max-width: 768px) {
      font-size: 14px; // Tamanho menor para dispositivos com largura até 768px
      padding: 8px; // Padding reduzido para dispositivos menores
    }
  }

  .error {
    color: red;
    margin-top: 5px;
  }
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
  defaultValue,
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
        defaultValue={defaultValue}
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