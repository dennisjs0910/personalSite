const routes = require('express').Router();
const { userManager } = require('@qm/index');

/**
 * Creates a new user
 */
// routes.post('/', async (req, res) => {
routes.post('/', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const result = await userManager.createUser({ first_name, last_name, email, password });
    if (!!!result) {
      res.status(400);
      res.json({
        field: "Email",
        message: "Email is already taken. Please choose a different email."
      });
      return;
    }
    res.sendStatus(200);
  } catch(err) {
    res.status(500);
    res.json({
      field: "Server",
      message: "The request was not completed due to an internal error on the server side."
    });
  }
});

module.exports = routes;