const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send("inside routes/index.js");
});

module.exports = routes;