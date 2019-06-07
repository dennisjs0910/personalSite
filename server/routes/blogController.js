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
let generateBlogObject = (title, tags) => {
  return {
    user_id: 1,
    title,
    category: _parseTags(tags)
  };
};

let generateBlogContentObject = (blogPost_id, image_url, image_text) => {
  return {
    blogPost_id,
    image_url,
    image_text,
    sequence: 0
  }
};

/**
 * This function returns a string seperating each word in tags with a ("x,-x")
 * @param  {String[]} tags
 * @return {String}
 */
let _parseTags = (tags) => {
  let res = "";
  tags.forEach(tag => res += tag + "x,-x");
  return res;
};

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
  const { title, tags, image_url, img_text} = req.body;
  try{
    const blogPostData = generateBlogObject(title, tags);
    const blogPostIds = await knex(BLOG_POST).insert(blogPostData);

    const blogContentData = generateBlogContentObject(blogPostIds[0], image_url, img_text);
    const blogContentIds = await knex(BLOG_CONTENT).insert(blogContentData);

    let whereClause = {};
    whereClause[`${BLOG_POST}.id`] = blogPostIds[0];
    const blogData = await knex.select('*').from(BLOG_POST)
      .leftJoin(BLOG_CONTENT, `${BLOG_POST}.id`, `${BLOG_CONTENT}.blogPost_id`)
      .where(whereClause)
      .options({ nestTables: true, rowMode: 'array' });

    res.status(200);
    res.json({ data: blogData });
  } catch(err) {
    console.log(err);
    res.status(404);
    res.json({ err });
  }
});

module.exports = routes;
