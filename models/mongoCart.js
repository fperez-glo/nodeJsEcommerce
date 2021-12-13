const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
    sku: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    price: {
        type: Number,
        default: 0,
    },
    thumbnail: String,
});

module.exports = model('carrito', cartSchema);