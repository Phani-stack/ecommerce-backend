import express from 'express';
import {
    products,
    product,
    deleteProduct
} from '../controllers/product.controller.js';

import {
    authenticate,
    isAdmin
} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/products', products);
router.get('/products/:id', product);
router.delete("/delete/:id", authenticate, isAdmin, deleteProduct);

export default router;
