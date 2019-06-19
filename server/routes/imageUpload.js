const routes = require('express').Router();
const cloudinary = require('cloudinary');

routes.post('/', (req, res) => {
  const values = Object.values(req.files);
  const promises = values.map(image => cloudinary.v2.uploader.upload(image.path, {
    use_filename: false,
    unique_filename: true,
    folder: `${process.env.CLOUDINARY_FOLDER}/`
  }));

  Promise.all(promises).then(results => {
    res.status(200);
    res.json(results)
  }).catch(err => {
    res.sendStatus(500);
  });
});



routes.delete('/', async (req, res) => {
  try {
    const { public_id } = req.body;
    const deleteResponse = await cloudinary.v2.uploader.destroy(public_id);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(404);
  }
});

module.exports = routes;