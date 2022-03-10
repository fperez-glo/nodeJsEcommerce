import 'dotenv/config';
// import ChatDaoMongoDB from './chat/ChatDaoMongoDB.js';
// import ProductDaoMongoDB from './product/ProductDaoMongoDB.js'
// import UserDaoMongoDB from './user/UserDaoMongoDB.js';
// import CartDaoMongoDB from './cart/CartDaoMongoDB.js';
import { ModelFactory } from '../ModelFactory.js';
let chatDao, userDao, productDao, cartDao

switch (process.env.DATASERVER) {
    // case 'ARCHIVO':
    //     import ChatDaoArchivo from './chat/ChatDaoArchivo.js';

    //     chatDao = new ChatDaoArchivo();
    //     break;
    // case 'FIREBASE':
    //     import  ChatDaoFirebase from './chat/ChatDaoFirebase';

    //     chatDao = new ChatDaoFirebase();
    //     break;
    case 'MONGODB':
        let MongoModelFactory = new ModelFactory();
      
        // chatDao = modelFactory.createModel('mensajes');
        // productDao = modelFactory.createModel('productos');
        // userDao = modelFactory.createModel('users');
        // cartDao = modelFactory.createModel('carritos');
        chatDao = MongoModelFactory.createModel('mensajes');
        productDao = MongoModelFactory.createModel('productos');
        userDao = MongoModelFactory.createModel('users');
        cartDao = MongoModelFactory.createModel('carritos');
        // console.log('chatDao: ', chatDao)
        // console.log('productDao: ', productDao)
        // console.log('userDao: ', userDao)
        // console.log('cartDao: ', cartDao)
        break;
    default:
        // const ProductosDaoMem = require('./productos/ProductosDaoMem.js')

        // chatDao = new ProductosDaoMem()
        break
}

export { chatDao, productDao, userDao, cartDao }