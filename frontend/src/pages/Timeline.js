import React, { Component } from 'react';
import socket from 'socket.io-client';

// Importa a api externa
import api from '../services/api';
// Importa o logo do twitter
import twitterLogo from '../twitter.svg';
// Importa arquivo de estilização
import './Timeline.css';

// Importa o componente tweet
import Tweet from '../components/Tweet';

export default class Timeline extends Component {
  // Variavel de estado que ira receber novo tweet
  state = {
    // Armazena os tweets que vieram na requisição da api
    tweets: [],
    // Armazena o novo tweet
    newTweet: '',
  };

  async componentDidMount() {
    // Chama a função assim que o componente é renderizado
    this.subscribeToEvents();

    // Variavel que armazena os dados de retorno da api(get -> http://localhost:3000/tweets)
    const response = await api.get('tweets');

    // Popula o array de tweets com os dados vindo da requisição da api(response)
    this.setState({ tweets: response.data });
  };

  // Interpreta a inserção de novos tweeters e likes e mostra tudo em tempo real 
  // utilzando o socket.io
  subscribeToEvents = () => {
    const io = socket('http://localhost:3000');

    io.on('tweet', data => {
      this.setState({ tweets: [data, ...this.state.tweets]});
    });

    io.on('like', data=> {
      this.setState({
        tweets: this.state.tweets.map(
          tweet => (tweet._id === data._id ? data : tweet)
        )});
    });
  };



  // Método para verificar o click do enter dentro da textarea para dar um submit no novo tweet
  handleNewTweet = async e => {
    // Verifica se o código da tecla é diferente de 13
    if (e.keyCode !== 13) return;

    // Cria variaveis para receber os dados do tweet e autor do tweet dalvo no localStorage
    const content = this.state.newTweet;
    const author = localStorage.getItem('@GoTwitter:username');

    // Aguarda a api fazer a requisição post
    await api.post('tweets', { content, author });

    // Seta o estado do textarea como vazio para a inserção de um novo tweeter
    this.setState({ newTweet: '' });
    
  };
  handleInputChange = e => {
    this.setState({ newTweet: e.target.value });
  };
  render() {
    return (
      <div className="timeline-wrapper">
        <img height={24} src={twitterLogo} alt="GoTwiiter"/>

        <form>
          <textarea
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder="O que está acontecendo?"
          />
        </form>

        <ul className="tweet-list">
          {this.state.tweets.map(tweet => (
            <Tweet key={tweet._id} tweet={tweet} />
          ))}
        </ul>
      </div>
    );
  }
}
