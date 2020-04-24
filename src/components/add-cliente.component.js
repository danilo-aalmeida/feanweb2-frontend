import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class AddCliente extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeCpf = this.onChangeCpf.bind(this);
    this.saveCliente = this.saveCliente.bind(this);
    this.newCliente = this.newCliente.bind(this);

    this.state = {
      id: null,
      nome: "",
      email: "", 
      cpf: "",

      submitted: false
    };
  }

  onChangeNome(e) {
    this.setState({
      nome: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeCpf(e) {
    this.setState({
      cpf: e.target.value
    });
  }

  saveCliente() {
    var data = {
      nome: this.state.nome,
      email: this.state.email,
      cpf: this.state.cpf
    };

    ClienteDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nome: response.data.nome,
          email: response.data.email,
          cpf: response.data.cpf,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCliente() {
    this.setState({
      id: null,
      nome: "",
      email: "",
      cpf: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Cliente adicionado com sucesso!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Adicionar
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="nome">Nome: </label>
              <input
                type="text"
                className="form-control"
                id="nome"
                required
                value={this.state.nome}
                onChange={this.onChangeNome}
                name="nome"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email: </label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">CPF: </label>
              <input
                type="text"
                className="form-control"
                id="cpf"
                required
                value={this.state.cpf}
                onChange={this.onChangeCpf}
                name="cpf"
              />
            </div>

            <button onClick={this.saveCliente} className="btn btn-success">
              Enviar
            </button>
          </div>
        )}
      </div>
    );
  }
}