import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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
  image: {
    type: String,
    required: [true, "Product image is required"]
  },
  inCart: {
    type: Boolean,
    required: true,
    default: false,
  },
  quantity: {
    type: Number,
    default: 0
  }
});

const Product = mongoose.model("Product", productSchema);

export default Product;