import { ClipboardEventHandler,ChangeEvent, FC } from 'react'
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
    font-size: 13px;
  }
`;



interface InputProps {
  type: 'text' | 'number' | 'email' | 'password';
  value: string | number;
  defaultValue?: string;
  name: string;
  placeholder: string;
  error: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPaste?: ( ClipboardEventHandler<HTMLInputElement>)
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
  onPaste,
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
        onPaste={onPaste}
      />
      {error && <p className="error"><TextoElegante>Preencha o Campo!</TextoElegante></p>}
    </div>
  )
}

export default Input