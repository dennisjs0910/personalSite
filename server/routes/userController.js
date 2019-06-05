const routes = require('express').Router();
const knexOptions = require('@root/knexfile');
const knex = require('knex')(knexOptions);
const USER_TABLE = "User";

/**
 * Creates a new user
 */
routes.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, password} = req.body;
    const users = await knex(USER_TABLE).insert({
      first_name, last_name, email, password, permission: "admin"
    });

    res.status(200);
    res.json({});
  } catch(err) {
    console.log(err);
    res.status(404);
    res.json({ error : err });
  }
});

module.exports = routes;