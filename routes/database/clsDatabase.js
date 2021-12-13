const { mysql, sqlite3, mysqlSeq, sqlite3Seq, mongoConnString } = require('./connection')
const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');

module.exports = class clsProducts {
    constructor(fileName) {
      this.products = [];
    }

    mysqlDB() {
      const db = new Sequelize(
        mysqlSeq.db,
        mysqlSeq.dbUser,
        mysqlSeq.dbPwd,
        mysqlSeq.server,
      );

      return db ;
    };

    sqlite3DB() {
      const db = new Sequelize(
        {storage: "../../db/ecommerce.sqlite", dialect: "sqlite"}
      );

      return db ;
    };

    mongoDB() {
      const db = mongoose;
      db.connect(mongoConnString);

      return db;
    }
};