const clsProductsMysql = require('../../routes/products/clsProductsMysql.js');

module.exports = class ProductosDaoMysql extends clsProductsMysql {

    constructor() {
        super('productos')
    };
};