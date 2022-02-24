import { ProductController } from '../controller/products.controller.js'
import express from "express";
import { isAdmin } from '../../midleware/midleware.js';

const { Router } = express;
const router = new Router();

const productController = new ProductController();

/** Devuelve a la Home page del ecommerse */
router.get('/', productController.getToHome);
/** Devuelve todos los productos */
router.get('/getAllProduct', productController.getAllProduct);
/** Recibe y agrega un producto */
router.post('/', isAdmin, productController.postProduct);
/** Recibe y actualiza un producto */
router.put('/:id', isAdmin, productController.putProduct);
/** Elimina un producto segun su id */
router.delete('/:id', isAdmin, productController.deleteProduct);
/** Elimina todos los productos */
router.delete('/', isAdmin, productController.deleteAllProducts);

export default router;