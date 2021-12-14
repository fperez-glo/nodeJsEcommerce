const fs = require("fs");

const { Cart } = require("../../models/mysqlCart");
const { Product } = require("../../models/mysqlProduct");

module.exports = class clsCart {
  constructor() {
    this.cart = {
      // id: 0,
      products: [],
    };
  }

  async postCart() {
    await Cart.create();
    const { dataValues } = await Cart.findOne({
      order: [["cartId", "DESC"]],
      attributes: ["cartId"],
    });

    const { cartId } = dataValues;

    return cartId;
  }

  async getCartProducts({ cartId }) {
    const carts = await Cart.count({
      where: {
        cartId,
      },
    });

    if (carts) {
      const cartProducts = await Cart.findAll({
        where: {
          cartId,
        },
        attributes: ["products"],
      });

      if (!cartProducts.length) {
        throw `No se encontraron productos en el carrito.`;
      }

      return JSON.parse(cartProducts[0].products);
    } else {
      throw `No se encontro el carrito con id: ${cartId}.`;
    }
  }

  async postAddCartProducts(cartId, prodId) {
    let product;
    let prodsToUpdate = [];

    const cart = await Cart.findAll({
      where: {
        cartId,
      },
    });

    if (!cart.length) {
      throw `No se encontro el carrito con id ${cartId}`;
    }

    const prod = await Product.findAll({
      where: {
        sku: prodId,
      },
      attributes: ["sku", "title"],
    });

    if (!prod.length) {
      throw `El producto ${prodId} no existe.`;
    }

    // Me creo un objeto para guardar el producto enviado
    product = prod[0].dataValues;
    // TODO: Levanto una cantidad (esta deberia llegar tambien por parametro a la api al ingresar el producto al carrito.)
    product.qty = 1;

    //Si existen, me guardo los productos que ya tiene el carrito.
    if (cart[0].dataValues?.products) {
      prodsToUpdate = JSON.parse(cart[0].dataValues.products);

      prodsToUpdate.forEach((prod) => {
        //Si encuentra quiere decir que el producto que envio ya esta en el carrito.
        if (prod.sku === prodId) {
          console.log("encontrado!!");
          product = prod;
          product.qty += 1;
        }
      });
      //filtro el producto y lo vuelvo a insertar con la nueva cantidad. Esto ahorarria mucho espacio fisico en la DB.
      prodsToUpdate = prodsToUpdate.filter((prod) => prod.sku != prodId);
    }

    prodsToUpdate.push(product);
    console.log("prodsToUpdate:", prodsToUpdate);

    //Updateo el registro en la DB.
    Cart.update(
      {
        products: JSON.stringify(prodsToUpdate),
      },
      {
        where: {
          cartId,
        },
      }
    );
  }

  async deleteCart({ cartId }) {
    await Cart.destroy({
      where: {
        cartId,
      },
    });
  }

  async deleteCartProduct({ cartId, prodId }) {
    let finded = false;
    let productsToReinsert = [];

    const cart = await Cart.findAll({
      where: {
        cartId,
      },
    });

    if (!cart.length) {
      throw `No se encontro el carrito con id ${cartId}`;
    }

    let { products } = cart[0];

    products = JSON.parse(products);

    //Tengo que buscarlo de esta forma ya que desde la DB estoy manejando un array de objetos pasado string.
    products.forEach((prod) => {
      if (prod.sku === prodId) {
        finded = true;
        productsToReinsert = JSON.stringify(
          products.filter((prod) => prod.sku != prodId)
        );
      }
    });

    if (!finded) {
      throw `No se encontro el producto '${prodId}' en el carrito '${cartId}'`;
    }

    //Updateo el carrito con los productos filtrados.
    await Cart.update(
      {
        products: productsToReinsert,
      },
      {
        where: {
          cartId,
        },
      }
    );
  }
};
