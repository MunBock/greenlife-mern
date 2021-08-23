import express from "express";
import Order from "../models/order.js";

import { user, admin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", [user, admin], async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
});

router.post("/", [user], async (req, res) => {
  const {
    orderItems,
    deliveryAddress,
    paymentMethod,
    itemsPrice,
    totalPrice,
    deliveryFee,
  } = req.body;

  if (orderItems.length === 0) {
    res.status(400).send({ message: "No order items" });
  }

  const order = new Order({
    orderItems,
    user: req.user._id,
    deliveryAddress,
    paymentMethod,
    itemsPrice,
    totalPrice,
    deliveryFee,
  });

  try {
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/myorders", [user], async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate(
    "user",
    "name"
  );
  res.status(200).json(orders);
});

router.get("/:id", [user], async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).send({ message: "Order not found" });
  }
});

export default router;
