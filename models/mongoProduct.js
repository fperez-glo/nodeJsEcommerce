const { Schema, model } = require("mongoose");

const productSchema = new Schema({
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
});

module.exports = model("producto", productSchema);
