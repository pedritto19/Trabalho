import "../../styles.css"
import { useNavigate } from 'react-router-dom';
import edicao from '../images/edicao.png'
import cadastro from '../images/cadastro.png'
import favicon from '../images/favicon.png'
import pesquisa from '../images/pesquisa.png'
import Modal from 'react-modal';
import fundo from '../images/fundo.jpg'
import fechar from '../images/fechar.png';
import React, { ChangeEvent, useState, useEffect } from 'react'
import { getColorByType } from "../../App";
import { TextoElegante } from "../../App";
import { GlobalStyle } from "../interfaces/input";
import Edicao from "../Edição/pagina_edicao";
import { usePokemons } from "../../backend/PokemonContext";

// Definição da interface para tipar os dados de um Pokémon





    function Mensagem() {


      //estados
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [name, setName] = useState('')
      const [isModalOpen2, setIsModalOpen2] = useState(false);
      const {pokemons,fetchPokemons } = usePokemons();




    
      // Encontrar o Pokémon pelo nome
    const pokemon = pokemons.find((p: any)  => p.name.toLowerCase() === name.toLowerCase());
    

    // verifica o botao de pesquisa e abre o modal caso tenha conteúdo
    const handleButtonClick = () => {
      if (name.trim() !== "") { // Verifica se o input não está vazio
        setIsModalOpen(true); // Abre o modal apenas se o input não estiver vazio
      }
    };
    const handleOpenModal2 = (pokemon: any) => {
      setIsModalOpen2(true); // Abre o modal
      fetchPokemons();
    };
  
    const handleclosemodal2=() =>{
      setIsModalOpen2(false);
      fetchPokemons();
    };


    let navigate = useNavigate();

    // funcao que direciona para pagina de cadastro
    function handleClick2() {
      navigate('/pagina_cadastro'); 
    }
    //evento que atribui valor ao nome
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)
    }
    
    
    useEffect(()=> {
      if ((pokemons.length === 0) ) {
        fetchPokemons();
        
      }
    })
  


    return (
        <div style={{ textAlign: 'center' }} className="container1" >
        
        
          <h3 style={{display: 'flex', alignItems: 'center', margin: '10px 0' }}><img src={favicon} style={{ width: 'auto', height: '40px'}}alt='' /></h3>
        <h3 style={{display: 'flex', alignItems: 'center', padding: '0px', margin: '0 0px' }}><TextoElegante>ポケモン</TextoElegante></h3>
        <div style={{ display: 'flex', alignItems: 'center',padding: '0px', margin: '0 20px' }}>
            <button  id="meuBotaoT" onClick={handleClick2} style={{ padding: '0px', margin: '0px 50px 0 50px' }}>
              <img src={cadastro} alt="Cadastrar" style={{ width: 'auto', height: '35px'}} />
              <span className="tooltip">Cadastrar Pokémon</span>
            
            </button>
            <button  id="meuBotaoT" onClick={handleOpenModal2} style={{ padding: '0px', margin: '0 1px' }}>
              <img src={edicao} alt="Editar" style={{ width: 'auto', height: '35px' }} />
              <span className="tooltip">Editar Pokémon</span>
              
            </button>
            </div>
            <GlobalStyle/>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '100px', gap: '10px', marginLeft: 'auto' }}>
              
              <input   
          value={name}
          name="name"
          className={'beautifulInput'}
          type="search"
          placeholder="Pesquisar Pokémon..."
          onChange={handleNameChange}
          style={{ padding: '10px', width: '200px' }}
          list="pokemon-options" />
          <datalist id="pokemon-options">
          {pokemons.map((pokemon: any) => (
             
           
           
              <option key={pokemon.id }value={pokemon.name}> {pokemon.name}</option>
    
           
           
          ))}
          </datalist>
          
          
          
          <button onClick={handleButtonClick} id='meuBotaoT' style={{ padding: '0px' }}><img style={{ width: 'auto', height: '30px' }} src={pesquisa}alt=''/></button>
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            width: '1000px', // Define a largura do modal
            height: '800px', // Define a altura do modal
            margin: 'auto', // Centraliza o modal na tela
            backgroundImage: `url(${fundo})`,
            backgroundSize: 'cover',
            filter: 'brightness(100%)', // Ajusta o brilho da imagem
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.20)',
            
          }
        }}><button style={{position: 'fixed'}} id="meuBotaoT" onClick={() => setIsModalOpen(false)}><img src={fechar} style={{ width: '30px', height: 'auto'}} alt=''/></button>
        
        
        <div style={{ textAlign: 'center' }} className='modal-content2'>
          {pokemon ? (
            <div>
              <h2>{pokemon.name}</h2>
              <img src={pokemon.imag} alt='' style={{ width: '500px', height: 'auto'}} />
              <div>
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
              )}</div>
            </div>
          ) : (
            <div>Pokémon não encontrado.</div>
          )}
        </div>
                
        
      
        </Modal>
       
        
        <Modal 
        isOpen={isModalOpen2} // Passa a propriedade isOpen
        onRequestClose={() => setIsModalOpen2(false)} // Opcional: Função para fechar o modal
        id='modalId'
        shouldCloseOnOverlayClick={true} // Impede que o modal feche ao clicar fora
        
        style={{
          content: {
            width: '1000px', // Define a largura do modal
            height: '800px', // Define a altura do modal
            margin: 'auto', // Centraliza o modal na tela
            backgroundImage: `url(${fundo})`,
            backgroundSize: 'cover',
            filter: 'brightness(100%)', // Ajusta o brilho da imagem
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.20)',
            
          }
        }}
      >

        <Edicao 
       
        closeModal={() => handleclosemodal2()} />

      </Modal>

   
      

      </div>
    );
  }
   
   export default Mensagem;





