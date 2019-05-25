const routes = require('express').Router();

routes.use("/image-upload", require('@routes/imageUpload'));

module.exports = routes;