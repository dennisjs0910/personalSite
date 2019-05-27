const routes = require('express').Router();
const knexOptions = require('@root/knexfile');
const knex = require('knex')(knexOptions);
const BLOG_POST = "BlogPost";
//================= Helper Functions ====================
let generateBlogObject = (title, tags) => {
  return {
    user_id: 1,
    title,
    category: _parseTags(tags)
  };
}

/**
 * This function returns a string seperating each word in tags with a ("x,-x")
 * @param  {String[]} tags
 * @return {String}
 */
let _parseTags = (tags) => {
  let res = "";
  tags.forEach(tag => res += tag + "x,-x");
  return res;
}


//================= ROUTER API ====================

routes.get('/', (req, res) => {
  console.log("hello this is a test");
  res.status(200);
  res.send({ success: "/api/blog sent you this message" });
});

routes.post('/', async (req, res) => {
  const { title, tags, image_url, img_descprition} = req.body;
  try{
    const data = generateBlogObject(title, tags);
    const knexRes = await knex(BLOG_POST).insert(data);

    res.status(200);
    res.send({ msg: "success -post /api/blog", data });
  } catch(err) {
    console.log(err);
    res.status(404);
    res.json({ err });
  }
});

module.exports = routes;
