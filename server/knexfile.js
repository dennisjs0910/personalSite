module.exports = {
  client: 'mysql',
  connection: {
    host:'mysql-db',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    port: '',
    database: process.env.MYSQL_DATABASE
  }
};
