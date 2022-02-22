import { CartController } from '../controller/cart.controller.js'
import express from "express";

const { Router } = express;
const router = new Router();

const cartController = new CartController();


router.get('/', cartController.getCartHome);
router.get('/:cartId/productos', cartController.getCartProducts);
router.post('/', cartController.postGenerateCart);
router.put('/:cartId/productos/:prodId', cartController.putCartProducts);
router.delete('/:cartId', cartController.deleteCart);
router.delete('/:cartId/productos/:prodId', cartController.deleteCartProduct);

export default router;