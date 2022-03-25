import { productDao, cartDao } from "../../models/daos/index.js";
import {CartService} from './cart.service.js'
// Generalmente los metodos del schema de graphql se guardan en una 
// variable llamada root.

const cartService = new CartService();

class graphQlService {
    //CONSULTAS GRAPHQL PRODUCTOS
    async getAllProducts () {
      return  await productDao.getAllProds();
    }

    async getProduct ({id}) {
        const prod = await productDao.getAllProds({sku: id});
        return prod[0] || null;
    }
  
    async postProduct (prod) {
        await productDao.save(prod);
        return prod || null;
    }

    async putProduct (prod) {
      const body = {
        description: prod.description,
        price: prod.price,
        title: prod.title,
        thumbnail: prod.thumbnail
      }
      await productDao.putUpdate(prod.sku, body)
      const prodUpdated = await productDao.getAllProds({sku: prod.sku})
      return prodUpdated[0] || null;
    }

    async deleteProduct ({sku}) {
      await productDao.delete({sku});
      return {sku};
    }

    async deleteAllProducts () {
      await productDao.deleteAll();
    }

    //CONSULTAS GRAPHQL CARRITOS
    async getCartProducts (cartId) {
      return await cartDao.getCartProducts(cartId);
    }

    async getAllCarts () {
      return await cartDao.getAll();
    }

    async postGenerateCart(userId) {
      return await cartDao.save(userId);
    }

    async deleteCart(cartId) {
      return await cartDao.delete({cartId});
    }

    async deleteCartProduct(cartId, prodId) {
      return await cartDao.deleteCartProduct({ cartId: parseInt(cartId), prodId });
    }

    async addCartProduct(prodId, userId) {
      return await cartService.addCartProduct(prodId, userId);
    }
  };

  export default new graphQlService();