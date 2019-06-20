const knexOptions = require('@root/knexfile');
const knex = require('knex')(knexOptions);
const COMMENT_TABLE = "Comment";
const VISIBLE_COLUMNS = ["id", "blogPost_id", "user_id", "parent_id", "comment_text", "created_at", "updated_at"];


module.exports = {
  /**
   * This function creates a comment, retrieving the first and last name of user and appending
   * @param  {[type]} options.blogPost_id
   * @param  {[type]} options.parent_id      [container it belongs to]
   * @param  {[type]} options.comment_text
   * @param  {[type]} options.user_id
   * @return {[type]}                        [object added in db]
   */
  createComment: async ({ blogPost_id, parent_id, comment_text, user_id }) => {
    try {
      const comments = await knex(COMMENT_TABLE)
        .insert({ blogPost_id, parent_id, comment_text, user_id })
        .returning(VISIBLE_COLUMNS);

      return comments[0];
    } catch (err) {
      return null;
    }
  },

  getComment: async blogPost_id => {
    try{
      const comments = await knex(COMMENT_TABLE)
        .select(VISIBLE_COLUMNS)
        .where({ blogPost_id })
        .orderBy('updated_at', 'desc');

      return comments;
    } catch(err) {
      return null;
    }
  }
}