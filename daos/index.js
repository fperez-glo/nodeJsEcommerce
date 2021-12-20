const dotenv = require('dotenv').config();
let chatDao

switch (process.env.DATASERVER) {
    // case 'ARCHIVO':
    //     const ChatDaoArchivo = await import('./productos/ProductosDaoArchivo.js')

    //     chatDao = new ChatDaoArchivo()
    //     break
    // case 'FIREBASE':
    //     const { default: ProductosDaoFirebase } = await import('./productos/ProductosDaoFirebase.js')

    //     chatDao = new ProductosDaoFirebase()
    //     break
    case 'MONGODB':
        console.log('entro por MONGODB')
        const ChatDaoMongoDB = require('./chat/ChatDaoMongoDB')

        chatDao = new ChatDaoMongoDB()
        break
    default:
        const ProductosDaoMem = require('./productos/ProductosDaoMem.js')

        chatDao = new ProductosDaoMem()
        break
}

module.exports = { chatDao }