require('dotenv').config();

let getDatabase = () => {
  return `${process.env.DB_NAME}_${process.env.NODE_ENV}`;
}

module.exports = {
  client: 'mysql',
  connection: {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: getDatabase()
  }
};