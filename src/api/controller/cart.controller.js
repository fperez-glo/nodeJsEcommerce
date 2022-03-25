import { CartService } from "../services/cart.service.js";
import { console as cLog } from '../../helpers/logger.js';

export class CartController extends CartService {
  constructor() {
    super();
  }
  
  async getCartHome({ session }, res) {
    try {
      if(session.authorized){
      const userId = session.passport.user;
      const userCart = await super.getUserCart({ userId });

      res.render("carrito", {userCart});
      } else {
          res.redirect('/');
      }
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
      await super.postGenerateCart(req.body.userId);
      res.status(201).json(`El carrito se genero exitosamente.`);
    } catch (err) {
      cLog.warn(`[ERROR]: ${err}`);
      res.status(501).json({ message: err });
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
      cLog.info({ message: message, data: {cartId, prodId} });
      res.redirect('/cart')
    } catch (err) {
      cLog.warn(`[ERROR]: ${err}`);
      res.send({ message: err });
    }
  }

  async addCartProduct ({ body, session }, res) {
    try {
      const { prodId } = body;
      const userId = session.passport?.user || body.userId;
      
      const userCart = await super.addCartProduct(prodId, userId)
      
      res.render('carrito', {userCart})
    } catch (err) {
      cLog.warn(`[ERROR]: ${err}`);
      res.send({ message: err });
    }
  }

  async confirmPurchase ({ session }, res) {
    try {
      const userId = session.passport.user;

      await super.confirmPurchase(userId);

      res.redirect('/cart')

    } catch (err) {
      cLog.warn(`[ERROR]: ${err}`);
      res.send({ message: err });
    }
  }
}
