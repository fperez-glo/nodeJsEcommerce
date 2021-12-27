const ContenedorMongoDB = require('../../contenedor/ContenedorMongoDB')
const moment = require('moment');

class UserDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super('users', {
            user: { type: String, require: true},
            password : {type: String, require: true},
            createDate: {type: Date, default: moment()},
        })
    }

    // async guardar(carrito = { productos: [] }) {
    //     return super.guardar(carrito)
    // }

    async findUser ({user,password}) {
        const searchFilter = { user, password }
        return super.getAll(searchFilter)
    }
}

module.exports = UserDaoMongoDB;