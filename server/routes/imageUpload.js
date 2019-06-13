const routes = require('express').Router();
const cloudinary = require('cloudinary');

routes.post('/', (req, res) => {
  const values = Object.values(req.files);
  const promises = values.map(image => cloudinary.uploader.upload(image.path));

  Promise.all(promises).then(results => {
    res.status(200);
    res.json(results)
  });
});


routes.delete('/:public_id', async (req, res) => {
  try {
    const { public_id } = req.params;
    const deleteResponse = await cloudinary.uploader.destroy(public_id);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
});

module.exports = routes;