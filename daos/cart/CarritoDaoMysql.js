const clsCartMysql = require('../../routes/products/clsCartMysql.js');

module.exports = class CarritoDaoMysql extends clsCartMysql {

    constructor() {
        super('productos')
    };
};