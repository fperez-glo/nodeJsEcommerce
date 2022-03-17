import ContenedorMongoDB from "./container/ContenedorMongoDB.js";
import {
  carritosSchema,
  usersSchema,
  productosSchema,
  mensajesSchema,
} from "./config/schemas.js";
import mongoose from "mongoose";
import mongoSequence from "mongoose-sequence";
import { cartDao, productDao } from "../models/daos/index.js";

const autoIncrementId = mongoSequence(mongoose);
const { Schema } = mongoose;

let instance = null;

class Model extends ContenedorMongoDB {
  constructor(schema, model) {
    super(schema, model);
  }

}

class CartModel extends Model {
  constructor(model) {
    super(customCartSchema, model);
  }

  async save(userId, carrito = { productos: [] }) {
    carrito.userId = userId;
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

  async putAddCartProducts(cartId, prodId) {
    const cart = await super.getAll({ cartId });

    if (cart.length) {
      const products = await productDao.getAll();
      const filterProd = products.filter((prod) => prod.sku === prodId);

      if (!filterProd.length) {
        throw `El producto ${prodId} no existe.`;
      }

      //Esto es para agregarle a la cola de productos que ya tiene el carrito.
      cart[0].products.push(filterProd[0]);
    } else {
      throw `No se encontro el carrito con id ${cartId}`;
    }

    await cartDao.put(cart[0]);
  }

  async deleteCartProduct({ cartId, prodId }) {
    let cartsToReinsert = [];

    const cart = await super.getAll({ cartId });

    if (cart.length) {
      //No valido existencia del producto porque se supone ya que existe.
      const filteredProducts = cart[0].products.filter(
        (product) => product.sku != prodId
      );

      cart[0].products = filteredProducts;
    } else {
      throw `No se encontro el carrito con id ${cartId}`;
    }

    await cartDao.put(cart[0]);
  }
}

class ChatModel extends Model {
  constructor(model) {
    super(
      mensajesSchema,
      model
    );
  }
}

class ProductModel extends Model {
  constructor(model) {
    super(productosSchema, model);
  }

  async getAllProds (searchFilter) {
    return await super.getAll(searchFilter)
  }
}

class UserModel extends Model {
  constructor(model) {
    super(usersSchema, model);
  }

  async findUser({ user, password }) {
    let searchFilter;
    if (password) {
      searchFilter = { user, password };
    } else {
      searchFilter = { user };
    }

    return super.getAll(searchFilter);
  }
}

export class ModelFactory {

  createModel(model) {
    switch (model) {
      // No se que hacer con esto... el carrito tiene varios metodos en la clase CartDaoMongoDB...
      case "carritos":
        return new CartModel(model);

      case "mensajes":
        return new ChatModel(model);

      case "productos":
        return new ProductModel(model);

      case "users":
        return new UserModel(model);

      default:
        break;
    }
  }
}

const customCartSchema = new Schema(carritosSchema);
customCartSchema.plugin(autoIncrementId, { inc_field: "cartId" });
