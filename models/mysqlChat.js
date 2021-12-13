const { DataTypes } = require("sequelize");
const clsDatabase = require("../routes/database/clsDatabase");
const sqliteSequelize = new clsDatabase().sqlite3DB();

const Mensaje = sqliteSequelize.define(
  "mensajes",
  {
    msgId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(30),
      require: true,
    },
    msg: {
      type: DataTypes.STRING(200),
    },
    datetime: {
      type: DataTypes.DATE,
    },
  },
  { timestamps: false }
);

module.exports = { Mensaje };