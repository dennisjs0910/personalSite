const routes = require('express').Router();

routes.use("/", require('@routes/sample'));
// routes.get('/', (req, res) => {
//   res.send("inside routes/index.js");
// });

module.exports = routes;