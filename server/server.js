require('dotenv');
require('module-alias/register');
require('@services/cloudinaryConnection');
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const morgan = require('morgan');
const formData = require('express-form-data');
const knexOptions = require('@root/knexfile');
const knex = require('knex')(knexOptions);

// App: Initialization, routes, and configuration
const app = express();
app.use(morgan('dev'));
app.use(formData.parse())
app.use(
  cookieSession({
    name: "session",
    maxAge: 1 * 1 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SESSION_KEY]
  })
);
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('@routes'));


// SERVER: Listen to a specific server port
const serverPort = process.env.SERVER_PORT || 5000;
const server = app.listen(serverPort, () => {
  console.log(`Running server at ${serverPort}`);
  console.log("Ctrl + c to close server");
});

process.on('SIGINT', async () => {
  console.log('\n-Received kill signal, shutting down gracefully');
  await knex.destroy();
  console.log('==========Knex instance destroyed===========');
  await server.close();
  console.log('======Closed out remaining connections======');
  process.exit(0);

  setTimeout(() => {
      console.error('-Could not close connections in time, forcefully shutting down');
      process.exit(1);
  }, 10000);
});
