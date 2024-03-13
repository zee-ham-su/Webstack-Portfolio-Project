const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

// Define routes for cart operations
router.post('/add', authMiddleware.authenticateToken, CartController.addToCart);
router.get('/', authMiddleware.authenticateToken, CartController.getCart);
router.put('/:id', authMiddleware.authenticateToken, CartController.updateCartItem);
router.delete('/:id', authMiddleware.authenticateToken, CartController.removeFromCart);

module.exports = router;
