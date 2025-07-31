import express from 'express';
import { addProduct, displayProducts, showProduct } from '../controllers/productsController.js';
import { isAuthenticated, isAdmin } from '../middlewares/authMiddleware.js';
const productRouter = express.Router();

productRouter.post('/add-product', addProduct);
productRouter.get('/display-products',  displayProducts);
productRouter.get('/display-product/:id', showProduct)
export default productRouter;