const Order = require("../model/order");
const Product = require("../model/product");
const createOrder = async (req, res) => {
  try {
    const { id, items, total, isPaid, address } = req.body;

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
          product: product._id, // Reference to the Product
          quantity: item.quantity,
        };
      })
    );
    const calculatedTotal = orderItems.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return acc + product.price * item.quantity;
    }, 0);

    const newOrder = Order({
      id,
      items: orderItems,
      total: calculatedTotal,
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
    console.error("Error retrieving orders:", error);
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

// Retrieve a single order by ID
const getOrderById = async (req, res) => {
  try {
    const OrderModel = mongoose.model("Order", orderSchema);
    const order = await OrderModel.findOne({ id: req.params.id });
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
