const dotenv = require('dotenv').config();
let chatDao, userDao, productDao

switch (process.env.DATASERVER) {
    case 'ARCHIVO':
        console.log('entro por ARCHIVO');
        const ChatDaoArchivo = require('./chat/ChatDaoArchivo');

        chatDao = new ChatDaoArchivo();
        break;
    case 'FIREBASE':
        console.log('entro por FIREBASE');
        const  ChatDaoFirebase = require('./chat/ChatDaoFirebase');

        chatDao = new ChatDaoFirebase();
        break;
    case 'MONGODB':
        console.log('entro por MONGODB');
        const ChatDaoMongoDB = require('./chat/ChatDaoMongoDB');
        const ProductDaoMongoDB = require('./product/ProductDaoMongoDB')
        const UserDaoMongoDB = require('./user/UserDaoMongoDB');

        chatDao = new ChatDaoMongoDB();
        productDao = new ProductDaoMongoDB();
        userDao = new UserDaoMongoDB();
        break;
    default:
        // const ProductosDaoMem = require('./productos/ProductosDaoMem.js')

        // chatDao = new ProductosDaoMem()
        break
}

module.exports = { chatDao, productDao, userDao }