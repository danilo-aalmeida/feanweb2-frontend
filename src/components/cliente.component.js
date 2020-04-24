import React, { Component } from "react";
import ClienteDataService from "../services/cliente.service";

export default class Cliente extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeCpf = this.onChangeCpf.bind(this);
    this.getCliente = this.getCliente.bind(this);
    this.updateCliente = this.updateCliente.bind(this);
    this.deleteCliente = this.deleteCliente.bind(this);

    this.state = {
      currentCliente: {
        id: null,
        nome: "",
        email: "",
        cpf: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCliente(this.props.match.params.id);
  }

  onChangeNome(e) {
    const nome = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCliente: {
          ...prevState.currentCliente,
          nome: nome
        }
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;
    
    this.setState(prevState => ({
      currentCliente: {
        ...prevState.currentCliente,
        email: email
      }
    }));
  }

  onChangeCpf(e) {
    const cpf = e.target.value;
    
    this.setState(prevState => ({
      currentCliente: {
        ...prevState.currentCliente,
        cpf: cpf
      }
    }));
  }

  getCliente(id) {
    ClienteDataService.get(id)
      .then(response => {
        this.setState({
          currentCliente: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCliente() {
    ClienteDataService.update(
      this.state.currentCliente.id,
      this.state.currentCliente
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Cliente atualizado com sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCliente() {    
    ClienteDataService.delete(this.state.currentCliente.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/clientes')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCliente } = this.state;

    return (
      <div>
        {currentCliente ? (
          <div className="edit-form">
            <h4>Cliente</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={currentCliente.nome}
                  onChange={this.onChangeNome}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentCliente.email}
                  onChange={this.onChangeEmail}
                />
              </div>
              <div className="form-group">
              <label htmlFor="cpf">CPF:</label>
                <input
                  type="text"
                  className="form-control"
                  id="cpf"
                  value={currentCliente.cpf}
                  onChange={this.onChangeCpf}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCliente}
            >
              Deletar
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCliente}
            >
              Atualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Por favor, selecione um cliente...</p>
          </div>
        )}
      </div>
    );
  }
}