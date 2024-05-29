import "./styles.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Pagina from './components/Cadastro/pagina_cadastro';
import Mensagem from './components/Home/componente';
import { useEffect, useState } from 'react';
import fundo from './components/images/fundo.jpg'
import topo from './components/images/topo.png'
import styled, { keyframes, css } from 'styled-components';
import { PokemonProvider } from "./backend/PokemonContext";
import { usePokemons } from "./backend/PokemonContext";
import recarregar from './components/images/recarregar.png'


export const TextoElegante = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: #000000;
  line-height: 1.6;
  text-align: center;
  letter-spacing: 0.5px;
`;
export const TextoElegante2 = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
  color: #000000;
  line-height: 1.6;
  text-align: center;
  letter-spacing: 0.5px;
`;
export const TextoElegante3 = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: red;
  line-height: 1.6;
  text-align: center;
  letter-spacing: 0.5px;
`;
export const TextoElegante4 = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: #90EE90;
  line-height: 1.6;
  text-align: center;
  letter-spacing: 0.5px;
`;

interface ChipProps {
  animate: boolean;
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Chip = styled.div<ChipProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #333;
  padding: 10px 20px;
  border-radius: 25px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s;
  position: absolute;
  top: 20px; /* Ajusta a posição do topo */
  right: 20px; /* Ajusta a posição da direita */

  &:hover {
    background-color: #e0e0e0;
  }

  img {
    margin-left: 10px;
    margin-right: 10px;
    width: 20px;
    height: 20px;
    ${props => props.animate && css`
      animation: ${rotate} 1s linear;
    `}
  }
`;

export function getColorByType(type: any) { //funcao para mudar a cor do texto com base no tipo selecionado
  const colors: { [key: string]: string } = {
    'Normal': "#808080",
    'Fire': "#FF0000",
    'Water': "#0000FF",
    'Grass': "#008000",
    'Flying': "#ADD8E6",
    'Fighting': "#FF8C00",
    'Electric': "#f3e246",
    'Ground': "#A52A2A",
    'Rock': "#654321",
    'Psychic': "#f324b5",
    'Ice': "#AFEEEE",
    'Bug': "#006400",
    'Ghost': "#A020F0",
    'Steel': "#C0C0C0",
    'Dragon': "#562fe4",
    'Dark': "#000000",
    'Fairy': "#FFB6C1",
    'Poison': "#800080", 
    
  };

  return colors[type] || "#FFB6C1"; 
}




function App() {
  // Estilização global aplicada ao body do documento
  const GlobalStyle = createGlobalStyle`

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-image: url(${fundo}); 
    background-size: cover; 
    background-position: center; 
    color: #333;
  }
  
  @media (max-width: 768px) {
    body {
      padding: 40px;
      background-image: url(${fundo}); 
      background-size: cover; 
    }
  }
`;







//todo: pokemons em ordem alfabetica

  // Estado para armazenar a lista de Pokémons e controle do botão de voltar ao topo
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { pokemons, fetchPokemons } = usePokemons();
  const [animate, setAnimate] = useState(false);

  const handleClick = async () => {
    setAnimate(true);
    await fetchPokemons();
    setTimeout(() => setAnimate(false), 10); 
  };
  useEffect(() => {

    window.addEventListener("scroll", () => {
      // if ((window.scrollY > 20) && (window.scrollY <60)){
      //   fetchPokemons();
      // }
      if (window.scrollY > 0) {
        setShowTopBtn(true); // Mostrar botão 
      } else {
        setShowTopBtn(false); // Esconder botão
      }
    });
  }, []);

  // Função para voltar ao topo
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Rolagem suave
    });
  };


 




  return (
    <PokemonProvider>
    <div>
      
      <header>
      <GlobalStyle />
    <Router>
      <Routes>
          {/* Definição das rotas para as diferentes páginas do app */}
        <Route path="/" element={<Mensagem />} />
        <Route path="/pagina_cadastro" element={<Pagina />}  />
      </Routes>
    </Router>
    </header>
    
    <div>
    <img src='' alt=''/>  
    </div>

    <div style={{ 
        textAlign: 'center', 
        display: 'flex',
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'relative',
         }} className="container" id="header">
        
          <Chip onClick={()=>handleClick()} animate={animate}>
            <img src={recarregar} alt="Atualizar" />  Atualizar
          </Chip>

        {/* Mapeamento e exibição dos Pokémons */}

        {pokemons.map((pokemon: any) => (
          <div key={pokemon.id} className="pokemon-container"> 
            <h3 className="pokemon-name">{pokemon.name}</h3> 
            <img style={{ width: 'auto', height: '90px' }} src={pokemon.imag} alt={pokemon.name} /> 
            <h2>
              <span style={{
                backgroundColor: getColorByType(pokemon.type),
                color: '#FFFFFF',
                padding: '5px 10px',
                borderRadius: '5px',
                fontSize: '15px',
              }}>
                {pokemon.type}
              </span>
              {' '}
              {pokemon.type1 && (
                <span style={{
                  backgroundColor: getColorByType(pokemon.type1),
                  color: '#FFFFFF',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  fontSize: '15px',
                }}>
                  {pokemon.type1}
                </span>
              )}
            </h2>
          </div>
        ))}
      
      
    </div>
    {/* Botão de voltar ao topo */}
    {showTopBtn && (
        <button id='meuBotaoT' onClick={goToTop} className="meuBotaoAnimado"  style={{ position: 'fixed', top: '20px', left: '48.2%'}}>
          <img src={topo} alt="Voltar ao topo" style={{ width: '40px', height: 'auto' }} />
        </button>
      )}
    </div>
    </PokemonProvider>
  );
}
export default App;
