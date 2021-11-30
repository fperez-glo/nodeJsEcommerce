const connections = require('./routes/database/connection')
const knex = require ('knex')(connections.mysql);

module.exports = class clsProducts {
    constructor(fileName) {
      this.products = [];
    }

    async insertPro
};