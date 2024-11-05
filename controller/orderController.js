const Order = require("../model/order");
const Product = require("../model/product");

const createOrder = async (req, res) => {
  try {
    const { id, items, total, isPaid, address } = req.body;
    console.log(req.body);
    if (!id || !items || !total || !address || isPaid === undefined) {
      return res.status(400).json({ error: "Required fields are missing" });
    }
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product with ID ${item.product} not found`);
        }
        return {
          product: product._id,
          quantity: item.quantity,
        };
      })
    );

    const newOrder = Order({
      id,
      items: orderItems,
      total: total,
      address: address,
      isPaid: isPaid || false,
      date: new Date(),
    });

    await newOrder.save();
    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

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
