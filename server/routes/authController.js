const routes = require('express').Router();
const knexOptions = require('@root/knexfile');
const knex = require('knex')(knexOptions);
const USER_TABLE = "User";
const VISIBLE_COLUMNS = ["id", "first_name", "last_name", "email", "permission"];

// TODO: restructure after passport is integrated
// TODO: remove console.log in the future

// TODO: /register may move to registrationContoller or delete that file if this is going to exist here.
routes.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, password} = req.body;
    const users = await knex(USER_TABLE)
      .insert({ first_name, last_name, email, password, permission: "admin" })
      .returning(VISIBLE_COLUMNS);
    if (!users || users.length === 0) {
      console.log("TODO users.length is empty");
    }
    //TODO: sending user info on registration does not make sense, please fix in task-24
    res.status(200);
    res.json({ user : users[0] });
  } catch(err) {
    console.log(err);
    res.status(404);
    res.json({ error : err });
  }
});

// TODO: this is for testing purpose, later on only check req.user after passport is integrated
routes.get('/', async (req, res) => {
  try{
    const user = await knex(USER_TABLE).where('id', 1);
    res.status(200);
    res.json({ user });
  } catch (err) {
    console.log(err);
    res.status(404);
    res.json({ error : err });
  }
});

routes.post('/', async (req, res) => {
  try {
    const { email, password} = req.body;
    const users = await knex(USER_TABLE)
      .select(VISIBLE_COLUMNS)
      .where({ email, password });

    if (!users || users.length === 0) {
      console.log("TODO users.length is empty");
    }

    res.status(200);
    res.json({ user : users[0] });
  } catch (err) {
    console.log(err);
    res.status(404);
    res.json({ error : err });
  }
});

module.exports = routes;
