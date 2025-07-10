import express from 'express'
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { addProductToCart, cartProducts } from '../controllers/productsController.js';

const cartRouter = express.Router();

cartRouter.get('/add-product-to-cart/:id', isAuthenticated, addProductToCart);
cartRouter.get('/display-cart-products', isAuthenticated, cartProducts);

export default cartRouter;