import express from 'express'
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { addProductToCart, cartProducts } from '../controllers/productsController.js';

const cartRouter = express.Router();

cartRouter.post('/add-product-to-cart/:id', addProductToCart);
cartRouter.get('/display-cart-products', cartProducts);

export default cartRouter;