import ContenedorMongoDB from './container/ContenedorMongoDB.js';

class Model extends ContenedorMongoDB{
    
    constructor(schema, table){
        super(schema, table)
    }
}

class CartModel extends Model {
    constructor (cartSchema){
        super(cartSchema, this.table);
        this.table = 'carritos'
    }
}

class ChatModel extends Model {
    constructor (chatSchema){
        super(chatSchema, this.table);
        this.table = 'mensajes'
    }
}

class ProductModel extends Model {
    constructor (productSchema){
        super(productSchema, this.tabla);
        this.table = 'productos'
    }
}

class UserModel extends Model {
    constructor (userSchema){
        super(userSchema, this.table);
        this.table = 'users'
    }
}


export class ModelFactory {
    createModel (table, schema) {
        switch (table) {
            // No se que hacer con esto... el carrito tiene varios metodos en la clase CartDaoMongoDB...
            case 'carritos':
                return new CartModel(schema)

            case 'mensajes':
                return new ChatModel(schema)

            case 'productos':
                return new ProductModel(schema)

            case 'users':
                return new UserModel(schema)
        
            default:
                break;
        }
    }
}