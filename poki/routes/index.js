var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'public' });
});

var pokemon = [
  {
    name: 'Pikachu',
    avatarUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'
  },
  {
    name: 'Charmander',
    avatarUrl: 'http://24.media.tumblr.com/tumblr_ma0tijLFPg1rfjowdo1_500.gif'

  },
  {
    name: 'Mew',
    avatarUrl: 'http://media3.giphy.com/media/J5JrPT8r1xGda/giphy.gif'
  },
  {
    name: 'Cubone',
    avatarUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/104.png'
  },
  {
    name: 'Cleffa',
    avatarUrl: 'http://media1.giphy.com/media/pTh2K2xTJ1nag/giphy.gif'
  },
  {
    name: 'Gengar',
    avatarUrl: 'https://s-media-cache-ak0.pinimg.com/originals/7e/3b/67/7e3b67c53469cc4302035be70a7f2d60.gif'
  }
];

router.get('/pokemon', function(req, res) {
  console.log("In Pokemon");
  res.send(pokemon);
  console.log(pokemon);
});

router.post('/pokemon', function(req, res) {
  console.log("In Pokemon Post");
  console.log(req.body);
  pokemon.push(req.body);
  res.end('{"success" : "Updated Successfully", "status" : 200}');
}); 

module.exports = router;
