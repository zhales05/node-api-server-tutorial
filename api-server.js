
var pokemon = [
  {
    id: 1,
    trainerId: 1,
    name: 'Pikachu',
    level: 35
  },
  {
    id: 2,
    trainerId: 1,
    name: 'Charizard',
    level: 40
  },
  {
    id: 3,
    trainerId: 2,
    name: 'Staryu',
    level: 20
  },
  {
    id: 4,
    trainerId: 2,
    name: 'Horsea',
    level: 22
  },
  {
    id: 5,
    trainerId: 3,
    name: 'Onyx',
    level: 15
  },
  {
    id: 6,
    trainerId: 3,
    name: 'Geodude',
    level: 13
  }
];

var http = require('http');
var url = require('url');
var fs = require('fs');
var ROOT_DIR = "src/";
var port = 4000;

http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true, false);

  if (urlObj.pathname === '/pokemon') {
    res.writeHead(200)
    res.end(JSON.stringify(pokemon))
  } else {
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  }

}).listen(port);

