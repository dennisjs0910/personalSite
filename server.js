require('dotenv');
require('module-alias/register');

const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(
  cookieSession({
    name: "session",
    maxAge: 1 * 1 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SESSION_KEY]
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Initialize all routes
app.use("/api", require('@routes'));

// Listen to a specific server port
const serverPort = process.env.SERVER_PORT || 5000;
const server = app.listen(serverPort, () => {
  console.log(`Running server at ${serverPort}`);
  console.log("Ctrl + c to close server");
});

process.on('SIGINT', () => {
  console.log('\nReceived kill signal, shutting down gracefully');
  server.close(() => {
      console.log('Closed out remaining connections');
      process.exit(0);
  });

  setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
  }, 10000);
});
