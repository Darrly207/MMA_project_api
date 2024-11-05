const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
} = require("../controller/orderController");
const { payment } = require("../controller/paymentController");
const router = express.Router();

// Route to create a new order
router.post("/orders", createOrder);

// Route to get all orders
router.get("/orders", getAllOrders);

// Optional: Route to get a specific order by ID
router.get("/orders/:id", getOrderById);
router.post("/payment", payment);
module.exports = router;
