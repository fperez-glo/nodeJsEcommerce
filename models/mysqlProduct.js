const { DataTypes } = require("sequelize");
const clsDatabase = require("../routes/database/clsDatabase");
const mysqlSequelize = new clsDatabase().mysqlDB();

const Product = mysqlSequelize.define(
  "productos",
  {
    sku: {
      type: DataTypes.STRING(30),
      require: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING(200),
    },
    price: {
      type: DataTypes.DECIMAL(20, 5),
      require: true,
    },
    thumbnail: {
      type: DataTypes.STRING(200),
    },
  },
  { timestamps: false }
);

module.exports = { Product };
