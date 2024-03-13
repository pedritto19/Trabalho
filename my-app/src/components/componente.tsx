import React, { Component } from 'react';
import beagle from './images/beagle.jpg'
import img from 'react-image'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './Header/styles.css'
import { useNavigate } from 'react-router-dom';
import seta from './images/seta.png'


type BoasVindas = {
    nome: string;
    cargo: string;
    imagem: string;
  };



  function Mensagem() {
    let navigate = useNavigate();

    function handleClick() {
      navigate('/pagina_cadastro'); // Substitua isso pelo seu caminho desejado
    }
    return (
        <div style={{ textAlign: 'center' }} className="container align-self-center d-flex justify-content-center" id="header">
        <h3 >Bem Vindo</h3>
        <p>Pagina inicial</p>
      <button onClick={handleClick}>
      <img src={seta} style={{ width: '30px', height: 'auto' , transform:'scaleX(-1)'}} />
      </button>
        
      </div>
    );
  }
   
   export default Mensagem;





