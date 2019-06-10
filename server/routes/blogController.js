const routes = require('express').Router();
const { blogManager } = require('@qm/index');

routes.get('/', async (req, res) => {
  const data = await blogManager.getBlogs();
  if (!!!data) {
    res.sendStatus(404);
    return;
  }

  res.status(200);
  res.json({ data });
});

routes.post('/', async (req, res) => {
  const { title, summary, tags, user_id, fileList, mediaText } = req.body;
  const data = await blogManager.createBlog(title, summary, tags, user_id, fileList, mediaText);
  if (!!!data) {
    res.sendStatus(404);
  }
  res.status(200);
  res.json({ data });
});

module.exports = routes;