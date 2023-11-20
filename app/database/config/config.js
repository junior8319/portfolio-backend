require('dotenv').config();
console.log('MYSQLDATABASE', process.env.MYSQLDATABASE);
console.log('MYSQLUSER', process.env.MYSQLUSER);
console.log('MYSQLPASSWORD', process.env.MYSQLPASSWORD);
console.log('MYSQLHOST', process.env.MYSQLHOST);
console.log('MYSQLPORT', process.env.MYSQLPORT);
console.log('ENV', process.env.NODE_ENV);

module.exports = {
  development: {
    username: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: 'portfolio_dev',
    host: process.env.MYSQLHOST,
    dialect: 'mysql'
  },
  test: {
    username: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: 'portfolio_test',
    host: process.env.MYSQLHOST,
    dialect: 'mysql'
  },
  production: {
    use_env_variable: process.env.DATABASE_URL || process.env.JAWSDB_URL,
    dialect: 'mysql',
  }
}
