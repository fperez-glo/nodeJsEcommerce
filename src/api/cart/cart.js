const express = require(`express`);
const { restart } = require('nodemon');
const clsCart = require('./clsCart');
const { Router } = express
const router = new Router();

const cartMethods = new clsCart();

router.get('/:id/productos',async ({ params }, res) => {
    try {
        //Capturo el id del carrito.
        const { id } = params;
        const cartProducts = await cartMethods.getCartProducts({id: parseInt(id)});
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

module.exports = router