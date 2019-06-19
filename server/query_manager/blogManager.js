const knexOptions = require('@root/knexfile');
const knex = require('knex')(knexOptions);

const BLOG_POST = "BlogPost";
const BLOG_POST_COL = ['id', 'user_id', 'title', 'category', 'created_at', 'updated_at'];

const BLOG_CONTENT = "BlogContent";
const BLOG_CONTENT_COL = ['id', 'blogPost_id', 'is_video', 'media_url', 'public_id', 'summary', 'sequence'];

const userManager = require('./userManager');

let _createBlogPostData = (title, summary, tags, user_id) => {
  return {
    title,
    user_id,
    summary,
    category: _parseTagsArrayToString(tags)
  };
};

let _createContentData = (blogPost_id, fileList=[], mediaText=[], contentIds=[]) => {
  let res = [];
  for (let idx = 0; idx < fileList.length; idx++) {
    const media_url = fileList[idx].response[0].secure_url;
    const public_id = fileList[idx].response[0].public_id;
    const summary = mediaText[idx];
    res.push({
      blogPost_id,
      is_video: false, // TODO: Requires refactoring when supporting video files.
      public_id,
      media_url,
      summary,
      sequence: idx
    });

    if (idx >= 0 && idx < contentIds.length) {
      res[idx].id = contentIds[idx];
    }
  }
  return res;
};

/**
 * This function returns a string seperating each word in tags with a ("x,-x")
 * @param  {String[]} [tags]
 * @return {String}
 */
let _parseTagsArrayToString = (tags=[]) => {
  let res = "";
  tags.forEach(tag => res += tag + "x,-x");
  return res;
};

/**
 * This returns an array of string that are split by "x,-x"
 * @param  {String} tagString [_parseTagsArrayToString() on an array]
 * @return {String[]}         [Array of tags]
 */
let _parseStringTagsToArray = (tagString="") => {
  const res = tagString.split("x,-x");
  return res.slice(0, res.length - 1);
};

/**
 * This function generates blog Objects that are to be returned to GET, POST /api/blog.
 * BlogContents are inserted into appropriate blogPost data and it keeps the ordering of
 * how blogData came in since it is sorted by updated_at column when it comes through
 * the parameter.
 *
 * @param  {BlogPost[]}    blogData     [Sorted by updated_at columns]
 * @param  {BlogContent[]} blogContents [Sorted by blogPost_id and sequence column]
 * @return {BlogPost[]}                 [contains BlogContent inside content array]
 */
let _generateBlogObjects = (blogData, blogContents) => {
  let map = {};
  let res = [];

  blogData.forEach(blogPost => {
    blogPost.contents = [];
    blogPost.category = _parseStringTagsToArray(blogPost.category);
    map[blogPost.id] = blogPost;
  });

  blogContents.forEach(content => {
    let key = content['blogPost_id'];
    if (!!map[key]) {
      map[key].contents.push(content);
    }
  });

  blogData.forEach(blogPost => {
    res.push(blogPost);
  });

  return res;
};

/**
 * Returns only the ids of blogData
 * @param  {BlogPost[]} blogData
 * @return {Integer[]}         [list of blogPost ids]
 */
let _getBlogIds = blogData => {
  let res = [];
  blogData.forEach(blog => {
    res.push(blog.id);
  });
  return res;
};

let getBlogAndContentsIds = blog => {
  let res = { id: -1, contentIds: []}
  res.id = blog.id;
  blog.contents.forEach(content => {
    res.contentIds.push(content.id);
  });
  return res;
}

// TODO: ERROR HANDLING
/**
 * Retrives all blogs
 * @return {[Object]} [Array of blog rows from db]
 */
let getBlogs = async () => {
  try {
    let blogData = await knex(BLOG_POST).select('*')
      .orderBy('updated_at', 'desc')
      .limit(100);

    const blogPostIds = _getBlogIds(blogData);

    let blogContents = await knex(BLOG_CONTENT).select('*')
      .whereIn('blogPost_id', blogPostIds)
      .orderBy(['blogPost_id', 'sequence']);

    const resData = _generateBlogObjects(blogData, blogContents);
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
    let blogData = await knex(BLOG_POST).select('*')
      .where(`${BLOG_POST}.id`, id)
      .orderBy('id');

    let blogContents = await knex(BLOG_CONTENT).select('*')
      .where('blogPost_id', blogData[0].id)
      .orderBy(['blogPost_id', 'sequence']);

    const resData = _generateBlogObjects(blogData, blogContents);

    return resData;
  } catch (err) {
    return null;
  }
};

let createBlog = async (title, summary, tags, user_id, fileList, mediaText) => {
  try {
    const [blogPostId] = await knex(BLOG_POST)
      .insert(_createBlogPostData(title, summary, tags, user_id))
      .returning('id');
    const blogContentIds = await knex(BLOG_CONTENT)
      .insert(_createContentData(blogPostId, fileList, mediaText));

    const data = await getBlogWithId(blogPostId);
    return data[0];
  } catch (err) {
    return null;
  }
};

let updateBlog = async ({title, summary, tags, user_id, fileList, mediaText, blog}) => {
  const {id, contentIds} = getBlogAndContentsIds(blog);
  const contentDatas = _createContentData(id, fileList, mediaText, contentIds);

  try {
    const isUserAdmin = await userManager.isUserAdmin({ id: user_id });
    const userId = isUserAdmin ? blog.user_id : user_id;

    const dbQueries = await knex.transaction(trx => {
      let queries = [];
      queries.push(knex(BLOG_POST)
        .where({ id, user_id: userId })
        .update(_createBlogPostData(title, summary, tags, userId))
      );

      if (mediaText.length < contentIds.length) {
        const diff = contentIds.length - mediaText.length;
        for (let i = 1; i <= diff; i++) {
          const sequence = contentIds.length - i;
          queries.push(knex(BLOG_CONTENT).where({blogPost_id: id, sequence }).del());
        }
      }

      contentDatas.forEach(data => {
        if (!data.id) {
          //insert to BlogContent table
          queries.push(knex(BLOG_CONTENT).insert(data));
        } else {
          //update BlogContent row
          queries.push(knex(BLOG_CONTENT)
            .where({ blogPost_id: data.blogPost_id, id: data.id })
            .update(data)
          );
        }
      });

      Promise.all(queries).then(trx.commit).catch(trx.rollback);
    });

    const data = await getBlogWithId(id);
    return data[0];
  } catch (err) {
    console.log(err);
    return null;
  }
};

let deleteBlog = async (id) => {
  try {
    const res = await knex(BLOG_POST).where('id', id).del();
    return res;
  } catch (err) {
    return null;
  }
};


// TODO: getBlogsFromUserId, createBlog need to be connected with a user.
module.exports = {
  getBlogs,
  getBlogsFromUserId,
  getBlogWithId,
  createBlog,
  updateBlog,
  deleteBlog,
};