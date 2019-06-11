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

routes.put('/', async (req, res) => {
  const { title, summary, tags, user_id, fileList, mediaText, blog } = req.body;
  const data = await blogManager.updateBlog(req.body);

  if (!!!data) {
    res.sendStatus(404);
  }
  res.status(200);
  res.json({ data });
});

routes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await blogManager.deleteBlog(id);
  if (!!!data) {
    res.sendStatus(404);
  }

  res.sendStatus(204);
});

module.exports = routes;