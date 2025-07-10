import Product from "../models/productSchema.js";


export const addProduct = async (req, res) => {
   const { title, image, price, description } = req.body;
   if (!title || !image || !price || !description) {
      return res.status(400).json({ success: false, message: 'incomplete request' })
   }

   const newProduct = new Product({
      title,
      image,
      description,
      price
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
   const { productId } = req.params;

   try {
      const product = await Product.findByIdAndUpdate(productId, {
         inCart: true,
         quantity: 1
      });

      if (!product) {
         return res.status(404).json({ success: false, message: 'Product not found' });
      }

      res.status(200).json({
         success: true,
         message: 'Product added to cart',
         cartItem: product
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
      
      const productsInCart = await Product.find({ inCart: true });

      if (!productsInCart) {
         return res.status(400).json({ success: false, message: 'no products are avilable' });
      }
      res.status(200).json({ success:true, message: 'products in cart are fetched', cartProducctsList: productsInCart  })
   } catch (error) {
      res.status(400).json({ success: false, message: error });
   }
}