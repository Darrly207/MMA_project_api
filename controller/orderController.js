// controllers/orderController.js
const Order = require("../model/order");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { id, items, total, isPaid } = req.body;

    // Validate required fields
    if (!id || !items || !total) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const newOrder = new Order({
      id,
      items,
      total,
      isPaid: isPaid || false, // Default to unpaid if not provided
      date: new Date(),
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Retrieve all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

// Retrieve a single order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ id: req.params.id });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error retrieving order:", error);
    res.status(500).json({ error: "Failed to retrieve order" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
};
