import ContenedorMongoDB from '../../container/ContenedorMongoDB.js';
import moment from 'moment';

export default class UserDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super('users', {
            user: { type: String, require: true},
            password : {type: String, require: true},
            fieldName: {type: String, require: true},
            adress:{type: String, require: true},
            age:{type: Number, require: true},
            phone:{type: String, require: true},
            avatar:{type: String, require: true},
            role:{type: String, default: 'costumer'},
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
};