import logo from './logo.svg';

import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';

import FormLica from './componets/Form';
import MiniDrawer from './componets/Drawer';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ListPelicula from './componets/ListPelicula';
import Home from './componets/Home'

function App() {

  return (
    <div >
      <BrowserRouter>
        <MiniDrawer></MiniDrawer>
        <Switch>
          <Route exact path={["/","/home"]} component={Home}></Route>
          <Route exact path={"/listar"} component={ListPelicula}></Route>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
