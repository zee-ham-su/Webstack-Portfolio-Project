const express = require('express');
const router = express.Router();
const { Product, ProductController } = require('../controllers/productController');

// Define routes for product CRUD operations
router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
