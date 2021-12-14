const mongoose ,{ Schema, model, now } = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const cartSchema = new Schema({
    // cartId: {
    //     type: Number,
    //     required: true,
    //     unique: true,
    // },
    timeStamp: {
        type: Date,
        default: now(),
    },
    products: {
        type: Object,
        sku: {
            type: String,
            required:true,
        },
        title: {
            type: String,
            required:true,
        },
        qty: {
            type: Number,
            default: 1,
        },
    },
});
cartSchema.plugin(AutoIncrement, {inc_field: 'cartId'});

module.exports = model('carrito', cartSchema);