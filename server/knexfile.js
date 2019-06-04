// module.exports = {
//   client: 'mysql',
//   connection: {
//     host:'mysql-db',
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_ROOT_PASSWORD,
//     port: '',
//     database: process.env.MYSQL_DATABASE
//   }
// };

module.exports = {
  client: 'pg',
  // connection: {
  //   host: process.env.db,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   port: process.env.DB_PORT,
  //   database: process.env.DB_DATABASE
  // }
  connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
};