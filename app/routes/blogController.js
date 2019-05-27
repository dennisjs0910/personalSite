const routes = require('express').Router();
const knexOptions = require('@root/knexfile');
const knex = require('knex')(knexOptions);
const BLOG_POST = "BlogPost";
const BLOG_POST_COL = ['id', 'user_id', 'title', 'category', 'created_at', 'updated_at'];

const BLOG_CONTENT = "BlogContent";
const BLOG_CONTENT_COL = ['id', 'blogPost_id', 'video_url', 'video_text',
  'image_url', 'image_text', 'sequence', 'created_at', 'updated_at'];

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

routes.get('/', (req, res) => {
  console.log("hello this is a test");
  res.status(200);
  res.send({ success: "/api/blog sent you this message" });
});

routes.post('/', async (req, res) => {
  const { title, tags, image_url, img_text} = req.body;
  try{
    let blogPostData = generateBlogObject(title, tags);
    const blogPostIds = await knex(BLOG_POST).insert(blogPostData);

    let blogContentData = generateBlogContentObject(blogPostIds[0], image_url, img_text);
    const blogContentIds = await knex(BLOG_CONTENT).insert(blogContentData);
    blogContentData = Object.assign(blogContentData, { id: blogContentIds[0] });
    blogPostData = Object.assign(blogPostData, { id : blogPostIds[0],
      content: blogContentData
    });

    res.status(200);
    res.send({
      msg: "success -post /api/blog",
      data: blogPostData
    });
  } catch(err) {
    console.log(err);
    res.status(404);
    res.json({ err });
  }
});

module.exports = routes;
