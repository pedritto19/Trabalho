import { MouseEventHandler,ClipboardEventHandler,ChangeEvent, FC } from 'react'
import styled, { createGlobalStyle } from 'styled-components';

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
export const GlobalStyle = createGlobalStyle`
  .beautifulInput, select.beautifulInput {
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 55px;
    margin: 10px 0;
    width: calc(100% - 600px);
    box-sizing: border-box;
  }

  .beautifulInput.error, select.beautifulInput.error {
    border-color: #ff0000;
  }

  .beautifulInput::placeholder {
    color: #a9a9a9;
  }

  @media (max-width: 768px) {
    .beautifulInput, select.beautifulInput {
      font-size: 14px;
      padding: 8px;
    }
  }
`;

//todo: criar pasta interface e guardar la todas interfaces do código

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password' | 'search';
  value?: string | number;
  defaultValue?: string;
  name: string;
  placeholder?: string;
  error: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPaste?: ( ClipboardEventHandler<HTMLInputElement>)
  onClick?: (MouseEventHandler<HTMLInputElement>)
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
  onClick,
}) => {

  return (
    <div className="input-wrapper">
     <GlobalStyle/>
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
        onClick={onClick}
      />
      {error && <p className="error"><TextoElegante>Preencha o Campo!</TextoElegante></p>}
      
    </div>
  )
}

export default Input