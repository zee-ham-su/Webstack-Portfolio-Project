const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');

// Define routes for payment operations
router.post('/', PaymentController.processPayment);

module.exports = router;
