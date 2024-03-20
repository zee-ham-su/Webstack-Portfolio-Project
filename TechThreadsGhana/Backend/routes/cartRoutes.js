const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');

// Define routes for cart operations
router.post('/add', CartController.addToCart);
router.get('/', CartController.getAllCarts);
router.put('/update', CartController.updateCartItem);
router.delete('/:cartId/items/:itemId', CartController.deleteCartItem);
router.delete('/:cartId', CartController.deleteCart);

module.exports = router;
