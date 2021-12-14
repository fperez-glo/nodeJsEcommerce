const dotenv = require('dotenv').config();
let productosDao
let carritosDao

switch (process.env.DATASERVER) {
    case 'ARCHIVO':
        console.log('entra por ARCHIVO')
        const ProductosDaoArchivo = require('./products/ProductosDaoArchivo.js')
        const CarritosDaoArchivo = require('./cart/CarritoDaoArchivo.js')

        productosDao = new ProductosDaoArchivo()
        carritosDao = new CarritosDaoArchivo()
        break
    // case 'FIREBASE':
    //     const { default: ProductosDaoFirebase } = require('./productos/ProductosDaoFirebase.js')
    //     const { default: CarritosDaoFirebase } = require('./carritos/CarritosDaoFirebase.js')

    //     productosDao = new ProductosDaoFirebase()
    //     carritosDao = new CarritosDaoFirebase()
    //     break
    case 'MONGODB':
        console.log('entra por MONGODB')
        const  ProductosDaoMongoDB  = require('./products/ProductosDaoMongoDB');
        const  CarritosDaoMongoDb  = require('./cart/CarritoDaoMongoDB.js');

        productosDao = new ProductosDaoMongoDB()
        carritosDao = new CarritosDaoMongoDb()
        break
    case 'MYSQL':
        console.log('entra por MYSQL')
        const  ProductosDaoMysql  = require('./products/ProductosDaoMysql.js')
        const  CarritosDaoMariaDb  = require('./cart/CarritoDaoMysql.js')

        productosDao = new ProductosDaoMysql()
        carritosDao = new CarritosDaoMariaDb()
        break
    // case 'SQLITE3':
    //     const { default: ProductosDaoSQLite3 } = require('./productos/ProductosDaoSQLite3.js')
    //     const { default: CarritosDaoSQLite3 } = require('./carritos/CarritosDaoSQLite3.js')

    //     productosDao = new ProductosDaoSQLite3()
    //     carritosDao = new CarritosDaoSQLite3()
    //     break
    default:
        //MEMORIA POR DEFAULT
        // const { default: ProductosDaoMem } = require('./productos/ProductosDaoMem.js')
        // const { default: CarritosDaoMem } = require('./carritos/CarritosDaoMem.js')

        // productosDao = new ProductosDaoMem()
        // carritosDao = new CarritosDaoMem()
        break
}

module.exports = { productosDao, carritosDao }