import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true, "Product name is required"],
      trim: true
   },
   description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true
   },
   price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"]
   },
   thumbnail: {
      type: String,
      required: [true, "Product image is required"]
   },
   quantity: {
      type: Number,
      default: 0
   },
   category: {
      type: String,
   },
   discount: {
      type: Number
   },
   rating: {
      type: Number
   },
   stock: {
      type: Number
   }
})

const CartProduct = mongoose.model('CartProduct', cartSchema);

export default CartProduct;