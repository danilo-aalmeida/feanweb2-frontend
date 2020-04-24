import React, { Component } from "react";
import ClienteDataService from "../services/cliente.service";
import { Link } from "react-router-dom";

export default class ClientesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchNome = this.onChangeSearchNome.bind(this);
    this.retrieveClientes = this.retrieveClientes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCliente = this.setActiveCliente.bind(this);
    this.removeAllClientes = this.removeAllClientes.bind(this);
    this.searchNome = this.searchNome.bind(this);

    this.state = {
      clientes: [],
      currentCliente: null,
      currentIndex: -1,
      searchNome: ""
    };
  }

  componentDidMount() {
    this.retrieveClientes();
  }

  onChangeSearchNome(e) {
    const searchNome = e.target.value;

    this.setState({
      searchNome: searchNome
    });
  }

  retrieveClientes() {
    ClienteDataService.getAll()
      .then(response => {
        this.setState({
          clientes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveClientes();
    this.setState({
      currentCliente: null,
      currentIndex: -1
    });
  }

  setActiveCliente(cliente, index) {
    this.setState({
      currentCliente: cliente,
      currentIndex: index
    });
  }

  removeAllClientes() {
    ClienteDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchNome() {
    ClienteDataService.findByNome(this.state.searchNome)
      .then(response => {
        this.setState({
          clientes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchNome, clientes, currentCliente, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Procurar cliente pelo nome"
              value={searchNome}
              onChange={this.onChangeSearchNome}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchNome}
              >
                Pesquisar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Lista de Clientes</h4>

          <ul className="list-group">
            {clientes &&
              clientes.map((cliente, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCliente(cliente, index)}
                  key={index}
                >
                  {cliente.nome} - {cliente.email}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllClientes}
          >
            Remover Todos
          </button>
        </div>
        <div className="col-md-6">
          {currentCliente ? (
            <div>
              <h4>Cliente</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {currentCliente.nome}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentCliente.email}
              </div>
              <div>
                <label>
                  <strong>CPF:</strong>
                </label>{" "}
                {currentCliente.cpf}
              </div>

              <Link
                to={"/clientes/" + currentCliente.id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Por favor selecione um cliente...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}