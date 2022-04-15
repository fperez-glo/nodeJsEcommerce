import { CartController } from '../controller/cart.controller.js'
import express from "express";

const { Router } = express;
const router = new Router();

const cartController = new CartController();


router.get('/', cartController.getCartHome);
router.get('/:cartId/productos', cartController.getCartProducts);
router.post('/', cartController.postGenerateCart);
router.post('/addProduct', cartController.addCartProduct)
router.delete('/:cartId', cartController.deleteCart);
router.post('/:cartId/productos/:prodId', cartController.deleteCartProduct);
router.post('/confirmPurchase', cartController.confirmPurchase);

export default router;