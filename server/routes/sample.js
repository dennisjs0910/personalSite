const routes = require('express').Router();
const store = require('@root/store');

routes.post('/createUser', (req, res) => {
  console.log("reached");
  console.log("I have been hit: ",req.body);
  store.createUser({
    username: req.body.username,
    password: req.body.password
  })
  .then(() => res.sendStatus(200));
});

module.exports = routes;