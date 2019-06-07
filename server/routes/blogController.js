const routes = require('express').Router();
const { blogManager } = require('@qm/index');

const knexOptions = require('@root/knexfile');
const knex = require('knex')(knexOptions);
const BLOG_POST = "BlogPost";
const BLOG_POST_COL = ['id', 'user_id', 'title', 'category', 'created_at', 'updated_at'];

const BLOG_CONTENT = "BlogContent";
const BLOG_CONTENT_COL = ['id', 'blogPost_id', 'video_url', 'video_text',
  'image_url', 'image_text', 'sequence', 'created_at', 'updated_at'];

// TODO: helper functions can move into blogManager.js
//================= Helper Functions ====================

//================= ROUTER API ====================

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
  const { user_id, title, tags, image_url, img_text } = req.body;
  const data = await blogManager.createBlog(1, title, tags, image_url, img_text);
  if (!!!data) {
    res.sendStatus(404);
  }
  res.status(200);
  res.json({ data });

});

module.exports = routes;