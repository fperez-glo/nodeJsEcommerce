const clsCartSQlite = require('../../routes/products/clsCartSQlite.js');

module.exports = class CarritoDaoSQlite extends clsCartSQlite {

    constructor() {
        super('productos')
    };
};