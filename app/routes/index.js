const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send("inside routes/index.js");
});

routes.use("/sample/", require('@routes/sample'));

module.exports = routes;