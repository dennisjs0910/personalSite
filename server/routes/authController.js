const routes = require('express').Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { userManager } = require('@qm/index');

//TODO: maybe passport should not be initialized here and can be moved to services.
passport.serializeUser(({ email }, done) => done(null, email));

passport.deserializeUser(async (email, done) => {
  const user = await userManager.getUser({ email });
  if (!!!user) return done(null, false, { message: `User with email ${email} does not exist.`})
  return done(null, user);
});

passport.use(new LocalStrategy({
    usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
    passwordField: 'password'
  },
  async (email, password, done) => {
    const user = await userManager.getUser({ email }, true);
    if (!!!user) {
      return done(null, false, { field: "email", message: "The email you’ve entered doesn’t match any account."})
    }

    // TODO: need to do one way hashing for production.

    if (password == user.password) {
      return done(null, user);
    } else {
      return done(null, false, { field: "password", message: "The password you’ve entered is incorrect."})
    }
  }
));

routes.get('/', async (req, res) => {
  if (!req.user) {
    res.sendStatus(404);
  } else {
    res.status(200);
    res.json({user: req.user});
  }
});

routes.post('/', async (req, res, next) => {
  passport.authenticate('local', { session: true } , (err, user, info) => {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(401).json({ field: info.field, message: info.message });
    req.login(user, err => {
      if (err) return res.status(500).json(err);
      res.status(200);
      res.json({ user });
    });
  })(req, res, next);
});

routes.delete("/", (req, res) => {
  try {
    req.session = null;
    req.logout();
    res.sendStatus(204);
  } catch (e) {
    res.status(500);
    res.json({ err });
  }
});

module.exports = routes;
