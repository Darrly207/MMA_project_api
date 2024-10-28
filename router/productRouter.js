const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

// Get all products
router.get("/", productController.getAllProducts);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);

// Delete a product
router.delete("/:id", productController.deleteProduct);

// Reduce product quantity after an order (with correct route)
router.post("/reduceProduct", productController.reduceQualityAfterOrder);

module.exports = router;
