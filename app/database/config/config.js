require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: 'portfolio_dev',
    host: process.env.HOST,
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
    // use_env_variable: 'DATABASE_URL',
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    // dialectOptions: {
    //     ssl: {
    //         rejectUnauthorized: true,        
    //     }
    // },
  },
}
