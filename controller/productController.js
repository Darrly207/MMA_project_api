const Product = require("../model/product");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reduce product quantity after order
const reduceQualityAfterOrder = async (req, res) => {
  try {
    const { id, quantity } = req.body;
    // Kiểm tra xem id và quantity có hợp lệ không
    if (!id || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid id or quantity" });
    }

    // Tìm sản phẩm theo id
    const product = await Product.findOne({ id: String(id) });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Kiểm tra số lượng sản phẩm có đủ không
    if (product.quantity < quantity) {
      return res
        .status(400)
        .json({ message: "Not enough product quantity available" });
    }

    // Giảm số lượng sản phẩm
    product.quantity -= quantity; // Thay đổi ở đây: Sử dụng product.quantity

    const updatedProduct = await product.save();
    res.json({ message: "Order placed successfully", product: updatedProduct });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  const product = new Product({
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    quality: req.body.quality, // Thêm quality
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.description = req.body.description || product.description;
    product.image = req.body.image || product.image;
    product.quality = req.body.quality || product.quality; // Cập nhật quality

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.remove();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  reduceQualityAfterOrder,
};
