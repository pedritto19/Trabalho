import { MouseEventHandler,ClipboardEventHandler,ChangeEvent, FC } from 'react'
import  { createGlobalStyle } from 'styled-components';
import { CSSProperties } from 'react';


export const GlobalStyle = createGlobalStyle`
  .beautifulInput, select.beautifulInput {
    padding: 10px 15px;
    border: 2px solid #ccc; /* Bordas mais definidas */
    border-radius: 55px; /* Bordas arredondadas para um look moderno */
    margin: 10px 0;
    width: calc(100% - 32px); /* Ajuste para garantir margens adequadas */
    box-sizing: border-box; /* Garante que padding não afete a largura total */
    background-color: #fff; /* Fundo branco para contraste com sombras */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra suave para profundidade */
    transition: border-color 0.3s ease, box-shadow 0.3s ease; /* Transições suaves */
    cursor: pointer; /* Indica que o elemento é interativo */
    appearance: none; /* Remove estilização padrão em navegadores */
    -webkit-appearance: none; /* Especificamente para Safari */
    
    color: #fffff; /* Cor do texto */
    font-weight: bold; /* Texto em negrito para melhor legibilidade */
  }

  .beautifulInput.error, select.beautifulInput.error {
    border-color: #ff3860; /* Cor de erro mais suave */
    box-shadow: 0 0 0 3px rgba(255, 56, 96, 0.2); /* Sombra externa para erro */
  }

  .beautifulInput::placeholder {
    color: #000000; /* Placeholder mais claro para contraste */
    
  }

  /* Ajustes para telas menores */
  @media (max-width: 768px) {
    .beautifulInput, select.beautifulInput {
      font-size: 14px;
      padding: 8px 12px; /* Padding reduzido para telas menores */
      width: calc(100% - 24px); /* Ajuste de largura para margens menores */
    }
  }

  /* Estilo para o ícone de seta, se decidir adicionar via pseudo-elemento ou contêiner */
  .select-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none; /* Permite cliques através do ícone */
    color: #fff; /* Cor do ícone */
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
  style?:  (CSSProperties) | undefined
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
  style,
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
        style={style}
      />
     
      
    </div>
  )
}

export default Input