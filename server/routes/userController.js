const routes = require('express').Router();
const { userManager } = require('@qm/index');

/**
 * Creates a new user
 */
routes.post('/', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const result = await userManager.createUser({ first_name, last_name, email, password });
  if (!!!result) {
    res.status(404)
    res.json({ error : err });
    return;
  }
  res.sendStatus(200);
});

module.exports = routes;