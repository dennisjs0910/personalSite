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

module.exports = routes;