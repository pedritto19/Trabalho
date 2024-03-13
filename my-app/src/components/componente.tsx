import React, { Component } from 'react';
import beagle from './images/beagle.jpg'
import img from 'react-image'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';


type BoasVindas = {
    nome: string;
    cargo: string;
    imagem: string;
  };



  function Mensagem() {
    return (
        <div className="container align-self-center d-flex justify-content-center" id="container-home">
        <img src={beagle}  />
        <h3>Bem Vindo</h3>
        <p>Pagina inicial</p>
        <li>
        <Link to='/pagina_cadastro'>Seguinte</Link>
        </li>
        

      </div>
    );
  }
   
   export default Mensagem;





