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
        cLog.debug({ cartProducts });
        res.send({ cartProducts });
    } catch (err) {
        cLog.warn(`[ERROR]: ${err}`);
        res.send({message: err});
    };
});

router.post('/', async(req, res) => {
    try {
        await cartDao.save();
        res.send(`El carrito se genero exitosamente.`);
    } catch (err) {
        cLog.warn(`[ERROR]: ${err}`);
        res.send({message: err});
    };
});

router.put('/:cartId/productos/:prodId', async({ params }, res) => {
    try {
        const message = 'Producto agregado.';
        const { cartId, prodId } = params;
        await cartDao.putAddCartProducts(parseInt(cartId), prodId);
        cLog.info({message});
        res.send({message});
    } catch (err) {
        cLog.warn(`[ERROR]: ${err}`);
        res.send({message: err});
    };
});

router.delete('/:cartId', async({ params }, res) => {
    try {
        const { cartId } = params;
        await cartDao.delete({cartId});
        const message = `Se elimino el carrito con id: ${cartId}.`;
        cLog.info({message});
        res.send({message});
    } catch (err) {
        cLog.warn(`[ERROR]: ${err}`);
        res.send({message: err});
    };
});

router.delete('/:cartId/productos/:prodId', async( { params } , res ) => {
    try {
        const { cartId, prodId } = params;
        //await cartMethods.deleteCartProduct({ cartId: parseInt(cartId), prodId });
        await cartDao.deleteCartProduct({ cartId: parseInt(cartId), prodId });
        const message = 'Producto Eliminado';
        cLog.info({message});
        res.send({message});
    } catch (err) {
        cLog.warn(`[ERROR]: ${err}`);
        res.send({message: err});
    };
});

export default router