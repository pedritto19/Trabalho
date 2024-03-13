import React, { Component } from 'react';
import Cadastro from './cadastro';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Pagina(){
  let navigate = useNavigate();

  function handleClick() {
    navigate('/'); // Substitua isso pelo seu caminho desejado
  }
    return (
      <div className="container align-self-center d-flex justify-content-center" id="container-home">
        
        <Cadastro></Cadastro>
        <div style={{ textAlign: 'center' }}>
          
        </div>

        
      </div>
  
    );
  }
  export default Pagina;