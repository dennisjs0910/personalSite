const routes = require('express').Router();
const { userManager } = require('@qm/index');

/**
 * Creates a new user
 */
routes.post('/', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const result = await userManager.createUser({ first_name, last_name, email, password });
    if (!!!result) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(200);
  } catch(err) {
    res.sendStatus(404);
  }

});

module.exports = routes;