import React, { Component } from 'react';
import Cadastro from './cadastro';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function Pagina(){
    return (
      <div className="container align-self-center d-flex justify-content-center" id="container-home">
        
        <Cadastro></Cadastro>

        <li>
        <Link to='/'>Retornar</Link>
        </li>
      </div>
  
    );
  }
  export default Pagina;