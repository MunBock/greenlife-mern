import express from "express";
import Product from "../models/product.js";

import { user, admin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

router.get("/expensive", async (req, res) => {
  const products = await Product.find({}).sort({ price: -1 }).limit(3);
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.send(product);
});

router.post("/", [user, admin], async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price,
    numberInStock: req.body.numberInStock,
  });

  try {
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", [user, admin], async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
      numberInStock: req.body.numberInStock,
    },
    { new: true }
  );

  if (!product) {
    return res
      .status(404)
      .send({ message: "The Product with the given ID is not found" });
  }

  res.send(product);
});

router.delete("/:id", [user, admin], async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product)
    return res
      .status(404)
      .send({ message: "The Product with the given ID is not found" });

  res.send(product);
});

export default router;
