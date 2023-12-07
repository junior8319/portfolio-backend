require('dotenv').config();
console.log(process.env.MYSQLUSER);
console.log(process.env.MYSQLPASSWORD);
console.log(process.env.MYSQLDATABASE);
console.log(process.env.MYSQLHOST);

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
    use_env_variable: 'DATABASE_URL' || 'JAWSDB_URL' || 'URL' || 'PLANET_DB_URL',
    username: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    host: process.env.MYSQLHOST,
    dialect: 'mysql',
  }
}
