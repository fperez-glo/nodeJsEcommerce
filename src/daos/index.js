import 'dotenv/config';
import ChatDaoMongoDB from './chat/ChatDaoMongoDB.js';
import ProductDaoMongoDB from './product/ProductDaoMongoDB.js'
import UserDaoMongoDB from './user/UserDaoMongoDB.js';
let chatDao, userDao, productDao

switch (process.env.DATASERVER) {
    // case 'ARCHIVO':
    //     console.log('entro por ARCHIVO');
    //     import ChatDaoArchivo from './chat/ChatDaoArchivo.js';

    //     chatDao = new ChatDaoArchivo();
    //     break;
    // case 'FIREBASE':
    //     console.log('entro por FIREBASE');
    //     import  ChatDaoFirebase from './chat/ChatDaoFirebase';

    //     chatDao = new ChatDaoFirebase();
    //     break;
    case 'MONGODB':
        chatDao = new ChatDaoMongoDB();
        productDao = new ProductDaoMongoDB();
        userDao = new UserDaoMongoDB();
        break;
    default:
        // const ProductosDaoMem = require('./productos/ProductosDaoMem.js')

        // chatDao = new ProductosDaoMem()
        break
}

export { chatDao, productDao, userDao }