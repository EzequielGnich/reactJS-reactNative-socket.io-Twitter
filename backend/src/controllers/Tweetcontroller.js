const Tweet = require('../models/Tweet');

module.exports = {
  // Método de busca dos Tweets no banco de dados
  async index(req, res) {
    const tweets = await Tweet.find({}).sort('-createdAt');
    // Retorna todos os tweets ordenado do mais novo ao mais antigo
    return res.json(tweets);
  },
  // Método de criação de tweets
  async store(req, res) {
    // Cria os tweets
    const tweet = await Tweet.create(req.body);

    req.io.emit('tweet', tweet);

    return res.json(tweet);
  }
}