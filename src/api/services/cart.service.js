import { cartDao, userDao } from "../../models/daos/index.js";
import { sendEmail } from "../../helpers/nodeMailer.js";
import { sendSMS, sendWhatsapp } from "../../helpers/twilio.js";

export class CartService {
  async getCartProducts(cartId) {
    return await cartDao.getCartProducts({ cartId: parseInt(cartId) });
  }

  async postGenerateCart(userId) {
    await cartDao.save(userId);
  }

  async addCartProduct(prodId, userId) {
    let userCart = await cartDao.getAll({ userId });

    if (userCart.length) {
      const { cartId } = userCart[0];
      await cartDao.putAddCartProducts(parseInt(cartId), prodId);
    } else {
      //creo el carrito para el usuario y agrego el producto
      await cartDao.save(userId);
      userCart = await cartDao.getAll({ userId });
      userCart.length &&
        (await cartDao.putAddCartProducts(
          parseInt(userCart[0].cartId),
          prodId
        ));
    }

    return await cartDao.getAll({ userId });
  }

  async deleteCart(cartId) {
    await cartDao.delete({ cartId });
  }

  async deleteCartProduct(cartId, prodId) {
    await cartDao.deleteCartProduct({ cartId: parseInt(cartId), prodId });
  }

  async getUserCart({ userId }) {
    return await cartDao.getAll({ userId });
  }

  async confirmPurchase(userId) {
    try {
      const userCart = await cartDao.getAll({ userId });
      if (userCart[0]?.products.length) {
        const userData = await userDao.getAll({ _id: userId });

        if (userData?.length) {
          const { user, fieldName } = userData[0];

          await sendEmail({
            subject: `Nuevo Pedido de ${fieldName}, email: ${user}`,
            html: `<b>Detalle del pedido:</b>
                <hr>
                <p>Productos:</p> <br>
                ${JSON.stringify(userCart[0]?.products, 2, null)}`,
          });

          await sendWhatsapp(`Nuevo Pedido de ${fieldName}, email: ${user}.
            Detalle del pedido:
            Productos:
            ${JSON.stringify(userCart[0]?.products, 2, null)}`);

          await sendSMS(`Su pedido ha sido recibido y se encuentra en proceso.
                      Portal de ventas Fperez.`);

          await cartDao.delete({ userId });
        }
      }
    } catch (err) {
      throw err;
    }
  }
}
