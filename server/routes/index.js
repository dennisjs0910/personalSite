const routes = require('express').Router();

routes.use("/image-upload", require('@routes/imageUpload'));
routes.use("/blog", require('@routes/blogController'));
routes.use("/user/session", require('@routes/authController'));
routes.use("/user", require('@routes/userController'));
routes.use("/blog/:blogPost_id/comment", require('@routes/commentController'));

module.exports = routes;