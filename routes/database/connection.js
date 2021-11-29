module.exports = connection = {
  client: "mysql",
  connection: {
    host: "192.168.0.135",
    user: "developer",
    password: "developer",
    database: "nodejsecommerce"
  },
  pool: { min: 1, max: 8 }
};
