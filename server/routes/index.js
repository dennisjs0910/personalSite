const routes = require('express').Router();

routes.use("/image-upload", require('@routes/imageUpload'));
routes.use("/blog", require('@routes/blogController'));
routes.use("/user", require('@routes/authController'));

module.exports = routes;