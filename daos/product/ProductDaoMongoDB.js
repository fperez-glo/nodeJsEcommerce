const ContenedorMongoDB = require('../../contenedor/ContenedorMongoDB')

class ProductDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super('productos', {
            sku: {
              type: String,
              required: true,
              unique: true,
            },
            title: {
              type: String,
              required: true,
            },
            description: String,
            price: {
              type: Number,
              required: true,
            },
            thumbnail: String,
            stock: {
              type: Number,
              default: 1,
            },
          })
    }

    // async guardar(carrito = { productos: [] }) {
    //     return super.guardar(carrito)
    // }
}

module.exports = ProductDaoMongoDB;
