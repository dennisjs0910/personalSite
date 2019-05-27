const routes = require('express').Router();
const cloudinary = require('cloudinary');

routes.post('/', (req, res) => {
  const values = Object.values(req.files)
  const promises = values.map(image => cloudinary.uploader.upload(image.path))

  Promise.all(promises).then(results => {
    res.json(results)
  });
});

module.exports = routes;
