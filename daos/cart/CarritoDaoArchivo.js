const clsCartArchivo = require('../../routes/products/clsCartArchivo.js');

module.exports = class CarritoDaoArchivo extends clsCartArchivo {

    constructor() {
        super('productos')
    };
};