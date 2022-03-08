import  mongoose from 'mongoose';
import moment from 'moment';
const { now } = mongoose;

  const productosSchema = {
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
  };

  const usersSchema = {
    user: { type: String, require: true },
    password: { type: String, require: true },
    fieldName: { type: String, require: true },
    adress: { type: String, require: true },
    age: { type: Number, require: true },
    phone: { type: String, require: true },
    avatar: { type: String, require: true },
    role: { type: String, default: "costumer" },
    createDate: { type: Date, default: moment() },
  }

  const mensajesSchema = {
    author: {
      id: { type: String, require: true },
      nombre: { type: String },
      apellido: { type: String },
      edad: { type: Number },
      alias: { type: String, require: true },
      avatar: { type: String },
    },
    text: { type: String, require: true },
    timeStamp: { type: Date },
  };

  const carritosSchema = {
    products: {
      type: Object,
      default: [],
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
    userId: {
      type: String,
      required: true,
    },
    timeStamp: {
      type: Date,
      default: now(),
    },
  };


export {
  carritosSchema,
  usersSchema,
  productosSchema,
  mensajesSchema
};