const knexOptions = require('@root/knexfile');
const knex = require('knex')(knexOptions);

const BLOG_POST = "BlogPost";
const BLOG_POST_COL = ['id', 'user_id', 'title', 'category', 'created_at', 'updated_at'];

const BLOG_CONTENT = "BlogContent";
const BLOG_CONTENT_COL = ['id', 'blogPost_id', 'video_url', 'video_text',
  'image_url', 'image_text', 'sequence', 'created_at', 'updated_at'];

// TODO: getBlogsFromUserId, createBlog need to be connected with a user.
module.exports = {
  getBlogs: async () => {
    try {
      const blogData = await knex.select('*').from(BLOG_POST)
        .leftJoin(BLOG_CONTENT, `${BLOG_POST}.id`, `${BLOG_CONTENT}.blogPost_id`);
      return blogData;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  getBlogsFromUserId: () => {

  },

  createBlog: async () => {

  }
};