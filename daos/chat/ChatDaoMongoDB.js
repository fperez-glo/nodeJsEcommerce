const ContenedorMongoDB = require('../../contenedor/ContenedorMongoDB')

class ChatDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super('mensajes', {
            author: { 
                id: {type: String, require: true},
                nombre: {type: String},
                apellido: {type: String},
                edad: {type: Number},
                alias: {type: String, require: true},
                avatar: {type: String},
             },
            text : {type: String, require: true},
            timeStamp: {type: Date},
        })
    }

    // async guardar(carrito = { productos: [] }) {
    //     return super.guardar(carrito)
    // }
}

module.exports = ChatDaoMongoDB;
