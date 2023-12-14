require('dotenv').config();
console.log('DATABASE_URL', process.env.DATABASE_URL);

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
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true,        
        }
  },
}
