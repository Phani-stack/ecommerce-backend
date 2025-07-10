import express from 'express';
import { addProduct, displayProducts } from '../controllers/productsController.js';
import { isAuthenticated, isAdmin } from '../middlewares/authMiddleware.js';
const productRouter = express.Router();

productRouter.post('/add-product', isAuthenticated, isAdmin, addProduct);
productRouter.get('/display-products', isAuthenticated, displayProducts);

export default productRouter;