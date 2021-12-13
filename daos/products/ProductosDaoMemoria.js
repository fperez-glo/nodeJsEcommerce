const clsProductsMemoria = require('../../routes/products/clsProductsMemoria.js');

module.exports = class ProductosDaoMemoria extends clsProductsMemoria {

    constructor() {
        super("productos")
    }
};