const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
