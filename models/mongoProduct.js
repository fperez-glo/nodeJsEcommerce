 const { Schema, model } = require('mongoose');

 const productSchema = new Schema({
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

 module.exports = model('producto', productSchema);