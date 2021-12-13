const clsCartFirebase = require('../../routes/products/clsCartFirebase.js');

module.exports = class CarritoDaoFirebase extends clsCartFirebase {

    constructor() {
        super('productos')
    };
};