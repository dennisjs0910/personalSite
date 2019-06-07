const knexOptions = require('@root/knexfile');
const knex = require('knex')(knexOptions);
const USER_TABLE = "User";
const VISIBLE_COLUMNS = ["id", "first_name", "last_name", "email", "permission"];

module.exports = {
  /**
   * Searches in the database to find specified user.
   * @param  {Object}  whereClause [object that contains fields that need to matched]
   * @param  {Boolean} reqPass     [true if object requires password, only used by passport]
   * @return {Object}              [user row from database]
   */
  getUser: async (whereClause = {}, reqPass = false) => {
    try {
      const columns = reqPass ? [...VISIBLE_COLUMNS, "password"] : VISIBLE_COLUMNS;
      const users = await knex(USER_TABLE).select(columns).where(whereClause);
      if (!!!users || users.length == 0) return null;
      return users[0];
    } catch (err) {
      return null;
    }
  },

  /**
   * Inserts row into "User" Table
   * @param  {Object} fields [fields that need to be inserted into the row]
   * @return {Object}        [Returns result object on success and null on failure]
   */
  createUser: async (fields) => {
    try {
      const result = await knex(USER_TABLE).insert(Object.assign({ ...fields }, { permission: "admin"}) );
      return result;
    } catch (err) {
      return null;
    }
  }
}