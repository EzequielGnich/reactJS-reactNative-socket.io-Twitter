const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || '3000';

mongoose.connect('mongodb://ezequielGnich:26eg15111990eg@ds155263.mlab.com:55263/goweek-gnich', {
  useNewUrlParser: true
});

// Adiciona "io" dentro do req para ter acesso em qualquer lugar da aplicação
app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(port, () => console.log(`Server is online on --> http://localhost:${port}`));