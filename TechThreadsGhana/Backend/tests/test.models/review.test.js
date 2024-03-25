import {describe, beforeAll, afterAll, it, expect} from "vitest";
const mongoose = require('mongoose');
const Review = require('../../models/review'); // Directory of review.js

describe('Review model', () => {
  // Connect to the MongoDB database before running tests
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://hamzasufian2014:DafBrscdZELfxbvc@cluster0.nmmyd8v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Disconnect from the MongoDB database after running tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new review with required fields', async () => {
    const productId = new mongoose.Types.ObjectId();
    const reviewData = {
      product: productId,
      rating: 4,
      comment: 'This product is great!',
    };
    const review = new Review(reviewData);
    await review.save();

    const foundReview = await Review.findById(review._id);
    expect(foundReview.product.toString()).toBe(productId.toString());
    expect(foundReview.rating).toBe(reviewData.rating);
    expect(foundReview.comment).toBe(reviewData.comment);
    expect(foundReview.createdAt).toBeTruthy();
    expect(foundReview.updatedAt).toBeTruthy();
  });

  it('should create a new review without a comment', async () => {
    const productId = new mongoose.Types.ObjectId();
    const reviewData = {
      product: productId,
      rating: 5,
    };
    const review = new Review(reviewData);
    await review.save();

    const foundReview = await Review.findById(review._id);
    expect(foundReview.product.toString()).toBe(productId.toString());
    expect(foundReview.rating).toBe(reviewData.rating);
    expect(foundReview.comment).toBeUndefined();
    expect(foundReview.createdAt).toBeTruthy();
    expect(foundReview.updatedAt).toBeTruthy();
  });
});
