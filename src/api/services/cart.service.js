import { cartDao } from "../../daos/index.js";

export class CartService {

  async getCartProducts(cartId) {
    return await cartDao.getCartProducts({ cartId: parseInt(cartId) });
  }

  async postGenerateCart() {
    await cartDao.save();
  }

  async putCartProducts(cartId, prodId) {
    await cartDao.putAddCartProducts(parseInt(cartId), prodId);
  }

  async deleteCart(cartId) {
    await cartDao.delete({ cartId });
  }

  async deleteCartProduct(cartId, prodId) {
    await cartDao.deleteCartProduct({ cartId: parseInt(cartId), prodId });
  }

}
