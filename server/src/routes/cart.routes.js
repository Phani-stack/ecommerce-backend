import express from 'express';
import {
    createCart,
    addProductToCart,
    cartProductsByUserId,
    removeProductFromCart,
    updateStockOfProduct
} from '../controllers/cart.controller.js';

import {
    authenticate,
    isAdmin
} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create', authenticate, createCart);
router.post('/add', authenticate, addProductToCart);
router.get('/products', authenticate, cartProductsByUserId);
router.get('/remove', authenticate, removeProductFromCart);
router.post('/update-stock', authenticate, updateStockOfProduct);

export default router;
