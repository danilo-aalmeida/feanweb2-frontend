import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddCliente from "./components/add-cliente.component";
import Cliente from "./components/cliente.component";
import ClientesList from "./components/clientes-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/clientes" className="navbar-brand">
              WEB2 - FEAN
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/clientes"} className="nav-link">
                  Clientes
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Adicionar
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/clientes"]} component={ClientesList} />
              <Route exact path="/add" component={AddCliente} />
              <Route path="/clientes/:id" component={Cliente} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;