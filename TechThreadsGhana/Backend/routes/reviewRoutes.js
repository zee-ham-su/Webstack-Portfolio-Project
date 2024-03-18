const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');

// Define routes for review operations
router.post('/', authMiddleware.authenticateToken, ReviewController.createReview);
router.get('/:productId', ReviewController.getReviewsByProduct);

module.exports = router;
