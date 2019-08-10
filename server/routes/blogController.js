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
  const { title, summary, tags, user_id, mediaList } = req.body;
  const data = await blogManager.createBlog(title, summary, tags, user_id, mediaList);
  if (!!!data) {
    res.sendStatus(404);
    return;
  }
  res.status(200);
  res.json({ data });
});

routes.put('/', async (req, res) => {
  const { title, summary, tags, user_id, mediaList, blog } = req.body;
  const data = await blogManager.updateBlog(title, summary, tags, user_id, mediaList, blog);

  if (!!!data) {
    res.sendStatus(404);
    return;
  }
  res.status(200);
  res.json({ data });
});

routes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await blogManager.deleteBlog(id);
  if (!!!data) {
    res.status(500);
    res.json({
      field: "Server",
      message: "The request was not completed due to an internal error on the server side."
    });
    return;
  }
  res.sendStatus(204);
});

module.exports = routes;