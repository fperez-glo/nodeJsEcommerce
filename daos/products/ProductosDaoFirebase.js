const clsProductsFirebase = require('../../routes/products/clsProductsFirebase');

module.exports = class ProductosDaoFirebase extends clsProductsFirebase {

    constructor() {
        super("productos")
    }
};