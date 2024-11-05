const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true, // Ensuring each order ID is unique
  },
  address: {
    type: String,
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  total: {
    type: String,
    required: true,
    min: 0, // Ensure total is not negative
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});
const Order = mongoose.model("Order", productSchema);

module.exports = Order;
