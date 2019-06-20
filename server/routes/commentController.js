const routes = require('express').Router();
const { commentManager } = require('@qm/index');

routes.get('/',  async (req, res) => {
  const { blogPostId } = req.query;
  const data = await commentManager.getComment(blogPostId);
  if (!!!data) {
    res.sendStatus(404);
    return;
  }
  res.status(200);
  res.json({ data });
});


routes.post('/',  async (req, res) => {
  const data = await commentManager.createComment(req.body);
  if (!!!data) {
    res.sendStatus(404);
    return;
  }
  res.status(200);
  res.json({ data });
});


routes.delete('/',  async (req, res) => {
  const { id } = req.body;
  const data = await commentManager.deleteComment(id);
  if (!!!data) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(204);
});

module.exports = routes;