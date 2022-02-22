import { CartService } from "../services/cart.service.js";
import { console as cLog } from '../../helpers/logger.js';

export class CartController extends CartService {
  constructor() {
    super();
  }
  
  async getCartHome({ params }, res) {
    try {
      res.render("carrito");
    } catch (err) {
      cLog.warn(`[ERROR]: ${err}`);
      res.send({ message: err });
    }
  }

  async getCartProducts({ params }, res) {
    try {
      //Capturo el id del carrito.
      const { cartId } = params;

      const cartProducts = await super.getCartProducts(cartId)
      cLog.debug({ cartProducts });
      res.send({ cartProducts });
    } catch (err) {
      cLog.warn(`[ERROR]: ${err}`);
      res.send({ message: err });
    }
  }

  async postGenerateCart(req, res) {
    try {
      await super.postGenerateCart();
      res.send(`El carrito se genero exitosamente.`);
    } catch (err) {
      cLog.warn(`[ERROR]: ${err}`);
      res.send({ message: err });
    }
  }

  async putCartProducts({ params }, res) {
    try {
      const { cartId, prodId } = params;
      await super.putCartProducts(cartId, prodId);

      const message = "Producto agregado.";
      cLog.info({ message });
      res.send({ message });
    } catch (err) {
      cLog.warn(`[ERROR]: ${err}`);
      res.send({ message: err });
    }
  }

  async deleteCart({ params }, res) {
    try {
      const { cartId } = params;
      await super.deleteCart(cartId);

      const message = `Se elimino el carrito con id: ${cartId}.`;
      cLog.info({ message });
      res.send({ message });
    } catch (err) {
      cLog.warn(`[ERROR]: ${err}`);
      res.send({ message: err });
    }
  }

  async deleteCartProduct({ params }, res) {
    try {
      const { cartId, prodId } = params;
      await super.deleteCartProduct(cartId, prodId);

      const message = "Producto Eliminado";
      cLog.info({ message });
      res.send({ message });
    } catch (err) {
      cLog.warn(`[ERROR]: ${err}`);
      res.send({ message: err });
    }
  }
}
