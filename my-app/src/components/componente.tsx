import React, { Component } from 'react';
import beagle from './images/beagle.jpg'
import img from 'react-image'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './Header/styles.css'
import { useNavigate } from 'react-router-dom';
import seta from './images/seta.png'
import styled from 'styled-components';
import {FaTrash} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import edicao from './images/edicao.png'
import cadastro from './images/cadastro.png'
import menu from './images/menu.png'


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

  function Mensagem() {
      interface pokemons {
        id: string;
        name: string;
        imag: string; 
        type: string; 
      }
    
    
      const [pokemons, setPokemons] = useState([]);
    
     
      useEffect(() => {
        const fetchPokemons = async () => {
          const response = await api.get('/pokemons');
          setPokemons(response.data);
        };
    
        fetchPokemons();
      }, []);
    
    let isEditingPage=false;



    let navigate = useNavigate();


    function handleClick2() {
      navigate('/pagina_cadastro'); 
    }

    function handleClick4() {
      navigate('/pagina_edicao'); 
    }
    const [menuVisivel, setMenuVisivel] = useState(false);

    const toggleMenu = () => {
      setMenuVisivel(!menuVisivel);
    };
    return (
        <div style={{ textAlign: 'center' }} className="container align-self-center d-flex justify-content-center " >
          <div>
        <h3><TextoElegante>Bem Vindo</TextoElegante></h3>
        <p><TextoElegante>Pagina inicial</TextoElegante></p>
        <button id="meuBotao" className='botao-menu' onClick={toggleMenu}><img src={menu} alt="Cadastrar" style={{ width: '30px', height: 'auto', transform: 'scaleX(-1)' }} /></button>
        {menuVisivel && (
          <div className="menu-opcoes">
            <button className='botao-com-texto' id="meuBotao" onClick={handleClick2}>
              <img src={cadastro} alt="Cadastrar" style={{ width: '30px', height: 'auto', transform: 'scaleX(-1)' }} />
              <span><TextoElegante2>Cadastrar Pokémon</TextoElegante2></span>
            </button>
            <button className='botao-com-texto' id="meuBotao" onClick={handleClick4}>
              <img src={edicao} alt="Editar" style={{ width: '30px', height: 'auto', transform: 'scaleX(-1)' }} />
              <span><TextoElegante2>Editar Pokémon</TextoElegante2></span>
            </button>
          </div>
        )}
      </div>
      </div>
    );
  }
   
   export default Mensagem;





