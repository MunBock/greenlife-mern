import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  description: String,
  price: Number,
  numberInStock: Number,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
