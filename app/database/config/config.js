require('dotenv').config();
console.log('DATABASE_URL', process.env.DATABASE_URL);
console.log('JAWSDB_URL', process.env.JAWSDB_URL);
console.log('URL', process.env.URL);
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
    use_env_variable: process.env.URL || process.env.DATABASE_URL || process.env.JAWSDB_URL,
    dialect: 'mysql',
  }
}
