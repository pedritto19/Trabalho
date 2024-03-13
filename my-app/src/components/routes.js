import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "./componente";
import caixa from "./pagina_cadastro"
import Pagina from "./pagina_cadastro";

const Routes1 = () => {
   return(
       <BrowserRouter>
           <Route component = { Home }  path="/componente" exact />
           <Route path="/pagina_cadastro" Component={Pagina} />
       </BrowserRouter>
   )
}

export default Routes1;