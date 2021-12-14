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
    title: {
      type: DataTypes.STRING(50),
      require: true,
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
    stock: {
      type: DataTypes.DECIMAL(5,0),
      defaultValue: 1,
    },
  },
  { timestamps: false }
);

module.exports = { Product };
