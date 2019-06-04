const routes = require('express').Router();

routes.use("/image-upload", require('@routes/imageUpload'));
routes.use("/blog", require('@routes/blogController'));

module.exports = routes;