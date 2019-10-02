const express = require('express');
const ships = require('./data/ships');
var cors = require('cors');
const server = express();
server.use(cors());
const port = 4000;

server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});

server.get(['/api/ships', '/api/ships/:query'], (req, res) => {
  const query = req.params.query;

  if (!query) {
    return res.json(ships);
  }

  const matches = ships.filter(ship =>
    ship.name.toLowerCase().includes(query.toLowerCase())
  );

  res.json(matches);
});
