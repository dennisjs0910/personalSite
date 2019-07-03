const knexOptions = require('@root/knexfile');
const knex = require('knex')(knexOptions);
const COMMENT_TABLE = "Comment";
const VISIBLE_COLUMNS = ["id", "blogPost_id", "user_id", "parent_id", "comment_text", "created_at", "updated_at"];

const USER_TABLE = "User";
const userManager = require('./userManager');

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
      let [comment] = await knex(COMMENT_TABLE)
        .insert({ blogPost_id, parent_id, comment_text, user_id })
        .returning(VISIBLE_COLUMNS);

      const user = await userManager.getUserName({id : user_id});
      comment.first_name = user.first_name;
      comment.last_name = user.last_name;
      return comment;
    } catch (err) {
      return null;
    }
  },

  getComment: async blogPost_id => {
    try{
      const selectCols = ['User.first_name', 'User.last_name',
        ...VISIBLE_COLUMNS.map(col => `${COMMENT_TABLE}.${col}`)
      ];

      const comments = await knex(COMMENT_TABLE)
        .join(USER_TABLE, `${USER_TABLE}.id`, `${COMMENT_TABLE}.user_id`)
        .select(selectCols)
        .where({ blogPost_id })
        .orderBy('updated_at', 'desc');

      return comments;
    } catch(err) {
      return null;
    }
  },

  deleteComment: async (id) => {
    try {
      const res = await knex(COMMENT_TABLE).where('id', id).del();
      return res;
    } catch (err) {
      return null;
    }
  }
}