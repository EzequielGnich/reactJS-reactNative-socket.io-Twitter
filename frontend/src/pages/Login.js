import React, { Component } from 'react';

import twitterLogo from '../twitter.svg';
import './Login.css';

export default class Login extends Component {
  state = {
    username: '',
  };
  handleSubmit = e => {
    // Evita qualquer evento padrão no submit do form
    e.preventDefault();

    // Desestruturação do ES6
    const { username } = this.state;

    // Cancela o login se não houver nada digitado no input
    if (!username.length) return;

    // Acessa o storage do 
    localStorage.setItem('@GoTwitter:username', username);

    // Acessa as propriedades dos elementos, history.push() é acessado pelo react-router-dom
    // para fazer a manipulação das rotas
    this.props.history.push('/timeline');
  };
  handleInputChange = e => {
    this.setState({ username: e.target.value });
  };
  render() {
    return (
      <div className="login-wrapper">
        <img src={ twitterLogo } alt="GoTwitter" />
        <form onSubmit={ this.handleSubmit }>
          <input 
            value={ this.state.username }
            onChange={ this.handleInputChange }
            placeholder="Nome de usuario" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
