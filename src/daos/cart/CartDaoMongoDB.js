import ContenedorMongoDB from "../../container/ContenedorMongoDB.js";
import mongoose from "mongoose";
import mongoSequence from "mongoose-sequence";
import { cartDao, productDao } from '../../daos/index.js';

const autoIncrementId = mongoSequence(mongoose);
const { Schema, now } = mongoose;

const schema = new Schema({
  //id: {type: String, require: true},
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
  timeStamp: {
    type: Date,
    default: now(),
  },
});

export default class CartDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super("carritos", schema);
  }

  async save(carrito = { productos: [] }) {
    return super.save(carrito);
  }

  async getCartProducts({ cartId }) {
    let cartProducts;
    const cart = await super.getAll({ cartId });
    
    if (cart.length) {
      if (cart[0].products.length) {
        cartProducts = cart[0].products;
      } else {
        throw `No se encontraron productos en el carrito.`;
      }

      return cartProducts;
    } else {
      throw `No se encontro el carrito con id: ${cartId}.`;
    }
  }

  async putAddCartProducts (cartId, prodId) {
    const cart = await super.getAll({ cartId });
    
    if (cart.length) { 
      const products = await productDao.getAll();
      const filterProd = products.filter(prod => prod.sku === prodId);

      if (!filterProd.length){
        throw `El producto ${prodId} no existe.`
      };
      
      //Esto es para agregarle a la cola de productos que ya tiene el carrito.
      cart[0].products.push(filterProd[0]);
    } else {
      throw `No se encontro el carrito con id ${cartId}`;
    };

    await cartDao.put(cart[0]);
  };

  async deleteCartProduct ({ cartId, prodId }) {
    let cartsToReinsert = []

    const cart = await super.getAll({ cartId });

    if (cart.length) { 
      
      //No valido existencia del producto porque se supone ya que existe.
      const filteredProducts = cart[0].products.filter(product => product.sku != prodId);
      
      cart[0].products = filteredProducts;
    } else {
      throw `No se encontro el carrito con id ${cartId}`;
    };
    
    await cartDao.put(cart[0]);
  };

};

schema.plugin(autoIncrementId, { inc_field: "cartId" });
