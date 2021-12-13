const dotenv = require('dotenv').config();
let productosDao
let carritosDao

switch (process.env.DATASERVER) {
    // case 'ARCHIVO':
    //     const { default: ProductosDaoArchivo } = require('./productos/ProductosDaoArchivo.js')
    //     const { default: CarritosDaoArchivo } = require('./carritos/CarritosDaoArchivo.js')

    //     productosDao = new ProductosDaoArchivo()
    //     carritosDao = new CarritosDaoArchivo()
    //     break
    // case 'FIREBASE':
    //     const { default: ProductosDaoFirebase } = require('./productos/ProductosDaoFirebase.js')
    //     const { default: CarritosDaoFirebase } = require('./carritos/CarritosDaoFirebase.js')

    //     productosDao = new ProductosDaoFirebase()
    //     carritosDao = new CarritosDaoFirebase()
    //     break
    case 'MONGODB':
        console.log('entra por MONGODB')
        const  ProductosDaoMongoDB  = require('./products/ProductosDaoMongoDB')
        // const { default: CarritosDaoMongoDb } = require('./carritos/CarritosDaoMongoDb.js')

        productosDao = new ProductosDaoMongoDB()
        // carritosDao = new CarritosDaoMongoDb()
        break
    case 'MYSQL':
        console.log('entra por MYSQL')
        const  ProductosDaoMysql  = require('./products/ProductosDaoMysql.js')
        //const { default: CarritosDaoMariaDb } = require('./carritos/CarritosDaoMariaDb.js')

        productosDao = new ProductosDaoMysql()
    //     carritosDao = new CarritosDaoMariaDb()
    //     break
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