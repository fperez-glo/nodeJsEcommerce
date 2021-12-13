const express = require('express');
const clsCart = require('./clsCartArchivo');
const { Router } = express
const router = new Router();

const cartMethods = new clsCart();

router.get('/:cartId/productos',async ({ params }, res) => {
    try {
        //Capturo el id del carrito.
        const { cartId } = params;
        const cartProducts = await cartMethods.getCartProducts({cartId: parseInt(cartId)});
        //console.log('cartProducts: ',cartProducts);

        res.send({ cartProducts });
    } catch (err) {
        res.send(err);
    };
});

router.post('/', async(req, res) => {
    try {
        const genCartId = await cartMethods.postCart();

        res.send(`Se genero el carrito con id: ${genCartId}.`)
    } catch (err) {
        res.send(err);
    };
});

router.post('/:cartId/productos/:prodId', async({ params }, res) => {
    try {
        const { cartId, prodId } = params;
        await cartMethods.postAddCartProducts(parseInt(cartId), prodId);
        res.send(`Producto agregado.`);
    } catch (err) {
        res.send(err);
    };
});

router.delete('/:cartId', async({ params }, res) => {
    try {
        const { cartId } = params;
        await cartMethods.deleteCart({ cartId: parseInt(cartId) });

        res.send(`Se elimino el carrito con id: ${cartId}.`);
    } catch (err) {
        res.send(err);
    };
});

router.delete('/:cartId/productos/:prodId', async( { params } , res ) => {
    try {
        const { cartId, prodId } = params;
        await cartMethods.deleteCartProduct({ cartId: parseInt(cartId), prodId });
        res.send('Producto Eliminado.')
    } catch (err) {
        res.send(err);
    };
});

module.exports = router