module.exports = connections = {
  mysql: {
    client: "mysql",
    connection: {
      host: "192.168.0.135",
      user: "developer",
      password: "developer",
      database: "nodejsecommerce",
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
