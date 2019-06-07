const knexOptions = require('@root/knexfile');
const knex = require('knex')(knexOptions);

const BLOG_POST = "BlogPost";
const BLOG_POST_COL = ['id', 'user_id', 'title', 'category', 'created_at', 'updated_at'];

const BLOG_CONTENT = "BlogContent";
const BLOG_CONTENT_COL = ['id', 'blogPost_id', 'video_url', 'video_text',
  'image_url', 'image_text', 'sequence', 'created_at', 'updated_at'];

let _createBlogPostObject = (user_id, title, tags) => {
  return {
    user_id,
    title,
    category: _parseTags(tags)
  };
};

let _createBlogContentObject = (blogPost_id, image_url, image_text) => {
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
let _parseTags = (tags=[]) => {
  let res = "";
  tags.forEach(tag => res += tag + "x,-x");
  return res;
};

/**
 * Retrives all blogs
 * @return {[Object]} [Array of blog rows from db]
 */
let getBlogs = async () => {
  try {
    const blogData = await knex.select('*').from(BLOG_POST)
      .leftJoin(BLOG_CONTENT, `${BLOG_POST}.id`, `${BLOG_CONTENT}.blogPost_id`);
    return blogData;
  } catch (err) {
    return null;
  }
};

let getBlogsFromUserId = () => {
  //TODO;
};

let = getBlogWithId = async (id) => {
  try {
    let whereClause = {};
    whereClause[`${BLOG_POST}.id`] = id;
    const [blogData] = await knex.select('*').from(BLOG_POST)
      .leftJoin(BLOG_CONTENT, `${BLOG_POST}.id`, `${BLOG_CONTENT}.blogPost_id`)
      .where(whereClause);

    return blogData;
  } catch (err) {
    return null;
  }
};

let createBlog = async (user_id, title, tags, image_url, img_text) => {
  try {
    const [blogPostId] = await knex(BLOG_POST)
      .insert(_createBlogPostObject(user_id, title, tags))
      .returning('id');

    const blogContentIds = await knex(BLOG_CONTENT)
      .insert(_createBlogContentObject(blogPostId, image_url, img_text));

    const data = await getBlogWithId(blogPostId);
    return data;
  } catch (err) {
    return null;
  }
};


// TODO: getBlogsFromUserId, createBlog need to be connected with a user.
module.exports = {
  getBlogs,
  getBlogsFromUserId,
  getBlogWithId,
  createBlog
};