const { DataTypes, NOW } = require("sequelize");
const clsDatabase = require("../routes/database/clsDatabase");
const mysqlSequelize = new clsDatabase().mysqlDB();

const Cart = mysqlSequelize.define(
  "carritos",
  {
    // TODO: No se si es necesario definir un auto incrementable en el modelo.. creeria que no ya que no se envia por parametro.
    cartId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    timeStamp: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    },
    products: {
        type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

module.exports = { Cart };