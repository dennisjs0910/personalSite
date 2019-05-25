const routes = require('express').Router();
const cloudinary = require('cloudinary');

// routes.get('/a', (req, res) => {
//   console.log("reached get /image-upload/a");
//   res.json({title: "reached get /image-upload/a"});
// });

routes.post('/', (req, res) => {
  const values = Object.values(req.files)
  console.log('values', values);
  const promises = values.map(image => cloudinary.uploader.upload(image.path))

  Promise.all(promises).then(results => {
    res.json(results)
  });
});

module.exports = routes;
