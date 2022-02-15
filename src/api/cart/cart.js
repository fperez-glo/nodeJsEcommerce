import express from 'express';
import clsCart from './clsCart.js';
const { Router } = express
const router = new Router();
import { cartDao } from '../../daos/index.js'; 
import { console as cLog } from '../../helpers/logger.js';

const cartMethods = new clsCart();

router.get('/:cartId/productos',async ({ params }, res) => {
    try {
        //Capturo el id del carrito.
        const { cartId } = params;
        
        const cartProducts = await cartDao.getCartProducts({cartId: parseInt(cartId)});
        res.send({ cartProducts });
    } catch (err) {
        cLog.warn(`[ERROR]: ${err}`)
        res.send(err);
    };
});

router.post('/', async(req, res) => {
    try {
        await cartDao.save();
        res.send(`El carrito se genero exitosamente.`)
    } catch (err) {
        cLog.warn(`[ERROR]: ${err}`)
        res.send(err);
    };
});

router.post('/:cartId/productos/:prodId', async({ params }, res) => {
    try {
        const { cartId, prodId } = params;
        await cartDao.postAddCartProducts(parseInt(cartId), prodId);
        res.send(`Producto agregado.`);
    } catch (err) {
        cLog.warn(`[ERROR]: ${err}`)
        res.send(err);
    };
});

router.delete('/:cartId', async({ params }, res) => {
    try {
        const { cartId } = params;
        await cartMethods.deleteCart({ cartId: parseInt(cartId) });

        res.send(`Se elimino el carrito con id: ${cartId}.`);
    } catch (err) {
        cLog.warn(`[ERROR]: ${err}`)
        res.send(err);
    };
});

router.delete('/:cartId/productos/:prodId', async( { params } , res ) => {
    try {
        const { cartId, prodId } = params;
        await cartMethods.deleteCartProduct({ cartId: parseInt(cartId), prodId });
        res.send('Producto Eliminado.')
    } catch (err) {
        cLog.warn(`[ERROR]: ${err}`)
        res.send(err);
    };
});

export default router