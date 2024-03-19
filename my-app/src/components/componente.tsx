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


const TextoElegante = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
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
    
      // Efeito para carregar os Pokémon quando o componente for montado
      useEffect(() => {
        const fetchPokemons = async () => {
          const response = await api.get('/pokemons');
          setPokemons(response.data); // Supondo que a resposta da API seja o array de Pokémon
        };
    
        fetchPokemons();
      }, []);
    
    let isEditingPage=false;



    let navigate = useNavigate();

    function handleClick() {
      navigate('/pagina_cadastro'); 
    }
    return (
        <div style={{ textAlign: 'center' }} className="container align-self-center d-flex justify-content-center" >
          <div>
        <h3><TextoElegante>Bem Vindo</TextoElegante></h3>
        <p><TextoElegante>Pagina inicial</TextoElegante></p>
      <button  id="meuBotao"    onClick={handleClick}>
      <img src={seta} style={{ width: '30px', height: 'auto' , transform:'scaleX(-1)'}} />
      </button>
      </div>
      </div>
    );
  }
   
   export default Mensagem;





