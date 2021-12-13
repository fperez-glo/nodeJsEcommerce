const clsCartMemoria = require('../../routes/products/clsCartMemoria.js');

module.exports = class CarritoDaoMemoria extends clsCartMemoria {

    constructor() {
        super('productos')
    };
};