import React, { Component } from 'react';

// Importa as rotas da aplicação
import Routes from './routes';

export default class App extends Component {
  render() {
    // Retorna apenas as rotas importadas
    return <Routes />;
  }
}
