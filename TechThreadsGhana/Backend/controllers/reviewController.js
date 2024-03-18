const Review = require('../models/review');

const ReviewController = {
  async createReview(req, res) {
    try {
      const { productId, rating, comment } = req.body;
      const userId = req.user.userId;

      // Create a new review
      const review = new Review({
        user: userId,
        product: productId,
        rating,
        comment
      });

      await review.save();

      return res.status(201).json(review);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

  async getReviewsByProduct(req, res) {
    try {
      const productId = req.params.productId;

      // Find all reviews for the specified product
      const reviews = await Review.find({ product: productId }).populate('user');

      return res.json(reviews);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }
};

module.exports = ReviewController;
