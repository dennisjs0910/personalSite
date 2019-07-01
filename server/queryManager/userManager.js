const knexOptions = require('@root/knexfile');
const knex = require('knex')(knexOptions);
const USER_TABLE = "User";
const VISIBLE_COLUMNS = ["id", "first_name", "last_name", "email", "permission"];
const ADMIN = "admin";

const bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUNDS = 5;

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

  getUserName: async (whereClause) => {
    try {
      const users = await knex(USER_TABLE)
        .select(['first_name', 'last_name'])
        .where(whereClause);
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
      const { password } = fields;
      const encryptedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
      const result = await knex(USER_TABLE)
        .insert(Object.assign(
          { ...fields }, {
            permission: "basic",
            password: encryptedPassword
          })
        );
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  isUserAdmin: async (whereClause = {}) => {
    try{
      const data = await knex(USER_TABLE).select(["permission"]).where(whereClause);
      return !!data && data.length === 1 && data[0].permission === ADMIN;
    } catch(err) {
      return false;
    }
  }
}