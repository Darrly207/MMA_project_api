const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
} = require("../controller/orderController"); // Adjust the path as necessary
const { payment, callback } = require("../controller/paymentController");
// Define routes
router.post("/orders", createOrder);
router.get("/orders", getAllOrders);
router.get("/orders/:id", getOrderById);
router.post("/payment", payment);
router.post("/callback", callback);
module.exports = router;
