const clsCartMongoDB = require('../../routes/products/clsCartMongoDB.js');

module.exports = class CarritoDaoMongoDB extends clsCartMongoDB {

    constructor() {
        super('productos')
    };
};