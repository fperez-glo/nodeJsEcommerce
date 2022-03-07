export default {
    productosSchema: {
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
      },
      usersSchema: {
        user: { type: String, require: true},
        password : {type: String, require: true},
        fieldName: {type: String, require: true},
        adress:{type: String, require: true},
        age:{type: Number, require: true},
        phone:{type: String, require: true},
        avatar:{type: String, require: true},
        role:{type: String, default: 'costumer'},
        createDate: {type: Date, default: moment()},
    },
    mensajesSchema: {
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
    },
    
}