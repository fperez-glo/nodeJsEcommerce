import { ProductController } from '../controller/products.controller.js'
import express from "express";

const { Router } = express;
const router = new Router();

const productController = new ProductController();

/** Devuelve a la Home page del ecommerse */
router.get('/', productController.getToHome);


export default router;