import 'dotenv/config';
import { ModelFactory } from '../ModelFactory.js';
let chatDao, userDao, productDao, cartDao

switch (process.env.DATASERVER) {
    case 'MONGODB':
        let MongoModelFactory = new ModelFactory();
        chatDao = MongoModelFactory.createModel('mensajes');
        productDao = MongoModelFactory.createModel('productos');
        userDao = MongoModelFactory.createModel('users');
        cartDao = MongoModelFactory.createModel('carritos');
        break;
    default:
        break
}

export { chatDao, productDao, userDao, cartDao }