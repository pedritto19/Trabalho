

import React from 'react';
import ReactDOM  from 'react-dom';
import App from './App';
import { PokemonProvider } from './backend/PokemonContext';

ReactDOM.render(
  <React.StrictMode>
    <PokemonProvider>
    <App></App>
    </PokemonProvider>
  </React.StrictMode>,
  document.getElementById('root')
);



