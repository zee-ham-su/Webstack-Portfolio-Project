const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');

// Define routes for cart operations
router.post('/add', CartController.addToCart);
router.get('/', CartController.getCart);
router.put('/:id', CartController.updateCartItem);
router.delete('/:cartId/remove/:itemId', CartController.removeFromCart);

module.exports = router;
