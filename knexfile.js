// Update with your config settings.

module.exports = {

    development: {
      client: "sqlite3",
      connection: {
        filename: "./db/ecommerce.sqlite",
      },
  
      pool: { min: 2, max: 8 },
      useNullAsDefault: true,
    },
  
  };
  