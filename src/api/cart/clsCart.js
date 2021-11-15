const fs = require('fs');
const moment = require('moment');
const dateFormat = 'DD/MM/YYYY hh:mm:ss';

const read = async (file) => {
  const read = await fs.promises.readFile(`./src/${file}`, `utf-8`);
  return read;
};

const write = async (file, items) => {
  await fs.promises.writeFile(
    `./src/${file}`,
    JSON.stringify(items, null, 2) + `\n`
  );
};

module.exports = class clsCart {
    constructor() {
      this.cart = {
        id: 0,
        timeStamp: moment().format(dateFormat),
        products: []
      };
    };


    async postCart () {
      const cartRead = await read('cart.json');
      const carts = JSON.parse(cartRead);
      
      this.cart.id = carts.length + 1;
      
      carts.forEach(cart => {
        while (cart.id === this.cart.id){
          this.cart.id += 1;
        };
      });

      carts.push(this.cart);

      await write('cart.json', carts);
      return this.cart.id;
    };

    async getCartProducts ( { cartId } ) {
      let cartProducts, findedCart = false;
      const cartRead = await read('cart.json');
      const carts = JSON.parse(cartRead);
      
      if (carts.length) {
        carts.forEach(cart => {
          if (cart.id === cartId) {
            findedCart = true;
            cartProducts = cart.products;
          };
        });

        if (!findedCart) {
          throw `No se encontro el carrito con id: ${cartId}.`
        };

        if (!cartProducts.length){
          throw `No se encontraron productos en el carrito.`
        };

        return cartProducts;

      } else {
        throw `No existen carritos disponibles.`
      };
    };

    async postAddCartProducts (product) {
      const cartRead = await read('cart.json');
      const carts = JSON.parse(cartRead);


    };

    async deleteCart ({ cartId }) {
      const cartRead = await read('cart.json');
      const carts = JSON.parse(cartRead); 
      
      const filteredCarts = carts.filter(cart => cart.id != cartId );

      await write('cart.json', filteredCarts);
    };

    async deleteCartProduct ({ cartId, prodId }) {
      let finded = false;
      const cartRead = await read('cart.json');
      const carts = JSON.parse(cartRead);

      carts.forEach(cart => {
        if (cart.id === cartId){
          finded = true;
          const filteredProducts = cart.products.filter(product => product.id != prodId);
          this.cart.id = cartId;
          this.cart.products = filteredProducts;
          
          carts.push(this.cart);
        };
      });

      if (finded) {
        await write('cart.json', carts);
      };

      //const filteredCarts = carts.filter(cart => cart.id != cartId );

      //await write('cart.json', filteredCarts);
    };
};


