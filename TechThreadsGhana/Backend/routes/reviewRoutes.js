const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/reviewController');

// Define routes for review operations
router.post('/', ReviewController.createReview);
router.get('/:productId', ReviewController.getReviewsByProduct);

module.exports = router;
