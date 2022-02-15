import fs from 'fs';
import moment from 'moment';
//import clsProducts from '../products/clsProducts.js';

const dateFormat = 'DD/MM/YYYY hh:mm:ss';
// const productMethods = new clsProducts();

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

export default class clsCart {
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

    async postAddCartProducts (cartId, prodId) {
      let findedCart= false;
      let cartsToReinsert = []

      const cartRead = await read('cart.json');
      
      //Tuve que leer los productos afuera sino me causaba problemas 
      //al declarar el callback del forEach como asincrono
      const prodRead = await read('productos.json');

      const carts = JSON.parse(cartRead);

      carts.forEach( cart => {
        if (cart.id === cartId){
          findedCart= true;
          
          const products = JSON.parse(prodRead);
          const filterProd = products.filter(prod => prod.sku === prodId)
          
          if (!filterProd.length){
            throw `El producto ${prodId} no existe.`
          };

          //Hago esto para filtrar el carrito donde agrego el producto (eliminarlo y volverlo a meter)
          cartsToReinsert = carts.filter (cart => cart.id != cartId)
          
          //Esto es para agregarle a la cola de productos que ya tiene el carrito.
          cart.products.push(filterProd[0]);

          //Asigno al carrito de mi constructor..
          this.cart.id = cartId;
          this.cart.products = cart.products;
          
          //pusheo el carro construido al bulk de carros
          cartsToReinsert.push(this.cart);
          
        };
      });

      if (!findedCart) {
        throw `No se encontro el carrito con id ${cartId}`;
      };

      await write('cart.json', cartsToReinsert);
      
    };

    async deleteCart ({ cartId }) {
      const cartRead = await read('cart.json');
      const carts = JSON.parse(cartRead); 
      
      const filteredCarts = carts.filter(cart => cart.id != cartId );

      await write('cart.json', filteredCarts);
    };

    async deleteCartProduct ({ cartId, prodId }) {
      let finded = false;
      let cartsToReinsert = []

      const cartRead = await read('cart.json');
      const carts = JSON.parse(cartRead);

      carts.forEach(cart => {
        if (cart.id === cartId){
          finded = true;

          //No valido existencia del producto porque se supone ya que existe.
          const filteredProducts = cart.products.filter(product => product.sku != prodId);

          //Hago esto para filtrar el carrito donde agrego el producto (eliminarlo y volverlo a meter)
          cartsToReinsert = carts.filter (cart => cart.id != cartId)

          this.cart.id = cartId;
          this.cart.products = filteredProducts;
          
          cartsToReinsert.push(this.cart);
        };
      });

      if (!finded) {
        throw `No se encontro el carrito.`
      };

      await write('cart.json', cartsToReinsert);
    };
};


