import Product from "../models/productSchema.js";
import CartProduct from "../models/cartSchema.js";

export const addProduct = async (req, res) => {
   const { title, price, description, thumbnail, discount, category, rating, stock } = req.body;
   if (!title || !price || !description || !thumbnail || !discount || !category || !rating || !stock) {
      return res.status(400).json({ success: false, message: 'incomplete request' })
   }

   const newProduct = new Product({
      title, price, description, thumbnail, discount, category, rating, stock
   })

   try {
      const savedProduct = await newProduct.save();
      res.status(200).json({ success: true, message: 'Product saved' })
   } catch (error) {
      res.status(400).json({ success: false, message: error })
   }
}

export const displayProducts = async (req, res) => {
   try {
      const products = await Product.find();
      res.status(200).json({ success: true, message: 'products fetched sucessfully', products });
   } catch (error) {
      res.status(400).json({ success: false, message: error });
   }
}

export const addProductToCart = async (req, res) => {
   const productId = req.params.id;

   try {
      const product = await Product.findById(productId);

      const productData = product.toObject();
      delete productData._id;


      const cartItem = new CartProduct({
         ...productData,
         productId: product._id, // keep reference
         quantity: 1
      })

      const addedProduct = await cartItem.save();

      res.status(200).json({
         success: true,
         message: 'Product added to cart',
         cartItem: addedProduct
      });

   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'Error adding to cart',
         error: error.message
      });
   }
};

export const cartProducts = async (req, res) => {
   try {

      const productsInCart = await CartProduct.find();

      if (!productsInCart) {
         return res.status(400).json({ success: false, message: 'no products are avilable' });
      }
      res.status(200).json({ success: true, message: 'products in cart are fetched', cartProducctsList: productsInCart })
   } catch (error) {
      res.status(400).json({ success: false, message: error });
   }
}

export const showProduct = async (req, res) => {
   const id = req.params.id;

   try {
      const getProduct = await Product.findById(id);
      res.json({ getProduct })
   } catch (error) {
      res.json({ error })
   }
}