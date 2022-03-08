import 'dotenv/config';
// import ChatDaoMongoDB from './chat/ChatDaoMongoDB.js';
// import ProductDaoMongoDB from './product/ProductDaoMongoDB.js'
// import UserDaoMongoDB from './user/UserDaoMongoDB.js';
// import CartDaoMongoDB from './cart/CartDaoMongoDB.js';
import { ModelFactory } from '../ModelFactory.js';
let chatDao, userDao, productDao, cartDao
let modelFactory = new ModelFactory();

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
        // chatDao = new ChatDaoMongoDB();
        // productDao = new ProductDaoMongoDB();
        // userDao = new UserDaoMongoDB();
        // cartDao = new CartDaoMongoDB();
        chatDao = modelFactory.createModel('mensajes');
        productDao = modelFactory.createModel('productos');
        userDao = modelFactory.createModel('users');
        cartDao = modelFactory.createModel('carritos');
        break;
    default:
        // const ProductosDaoMem = require('./productos/ProductosDaoMem.js')

        // chatDao = new ProductosDaoMem()
        break
}

export { chatDao, productDao, userDao, cartDao }