module.exports = connections = {
  mysql: {
    client: "mysql2",
    connection: {
      host: "192.168.0.11",
      port: 3307,
      user: "developer",
      password: "developer",
      database: "ecommerce",
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
