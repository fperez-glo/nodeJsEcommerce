const clsProductsMongoDB = require('../../routes/products/clsProductsMongoDB');

module.exports = class ProductosDaoMongoDB extends clsProductsMongoDB {

    constructor() {
        super("productos")
    }
};