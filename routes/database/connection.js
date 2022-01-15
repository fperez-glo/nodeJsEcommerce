const dotenv = require('dotenv').config();

module.exports = connections = {
  mysql: {
    client: "mysql2",
    connection: {
      host: process.env.MYSQLCONN_HOST,
      port: process.env.MYSQLCONN_PORT,
      user: process.env.MYSQLCONN_USER,
      password: process.env.MYSQLCONN_PASSWORD,
      database: process.env.MYSQLCONN_DATABASE,
      multipleStatements: true,
    },
    pool: { min: 2, max: 8 },
    
  },

  sqlite3: {
    client: "sqlite3",
    connection: {
      filename: "./db/ecommerce.sqlite",
    },

    pool: { min: 2, max: 8 },
    useNullAsDefault: true,
  },
};
