const routes = require('express').Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const knexOptions = require('@root/knexfile');
const knex = require('knex')(knexOptions);
const USER_TABLE = "User";
const VISIBLE_COLUMNS = ["id", "first_name", "last_name", "email", "permission"];

passport.serializeUser(({ email }, done) => done(null, email));

passport.deserializeUser(async (email, done) => {
  try {
    const users = await knex(USER_TABLE).select(VISIBLE_COLUMNS).where({ email });
    if (!users || users.length == 0) {
      return done(null, false, { message: `User with email ${email} does not exist.`})
    } else {
      return done(null, users[0]);
    }
  } catch (err) {
    return done(null, false, { message: `User with email ${email} does not exist.`});
  }
});

passport.use(new LocalStrategy(async (email, password, done) => {
  try {
    const users = await knex(USER_TABLE).select([...VISIBLE_COLUMNS, "password"]).where({ email });
    if (!users || users.length === 0) {
      return done(null, false, { field: "email", message: "The email you’ve entered doesn’t match any account."})
    }
    // TODO: need to do one way hashing for production.
    if (password == users[0].password) {
      return done(null, users[0]);
    } else {
      return done(null, false, { field: "password", message: "The password you’ve entered is incorrect."})
    }
  } catch (err) {
    return done(null, false, { field: "email", message: "The email you’ve entered doesn’t match any account."})
  }
}));

// TODO: this is for testing purpose, later on only check req.user after passport is integrated
routes.get('/', async (req, res) => {
  console.log("req.user", req.user);
  if (!req.user) {
    res.sendStatus(404);
  } else {
    res.status(200);
    res.json({user: req.user});
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
    res.status(404);
    res.json({ error : err });
  }
});

routes.delete("/", (req, res) => {
  try {
    req.session = null;
    req.logout();
    res.sendStatus(204);
  } catch (e) {
    res.status(500);
    res.send(e);
  }
});


module.exports = routes;
