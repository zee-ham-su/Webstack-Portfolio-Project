import {describe, beforeAll, afterAll, it, expect} from "vitest";
const mongoose = require('mongoose');
const Product = require('../../models/Product'); // Directory of product.js

describe('Product model', () => {
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

  it('should create a new product with required fields', async () => {
    const productData = {
      name: 'Test Product',
      description: 'This is a test product',
      price: 10.99,
      image: 'test-image.jpg',
    };
    const product = new Product(productData);
    await product.save();

    const foundProduct = await Product.findById(product._id);
    expect(foundProduct.name).toBe(productData.name);
    expect(foundProduct.description).toBe(productData.description);
    expect(foundProduct.price).toBe(productData.price);
    expect(foundProduct.image).toBe(productData.image);
    expect(foundProduct.quantity).toBe(0); // Default value
    expect(foundProduct.createdAt).toBeTruthy();
    expect(foundProduct.updatedAt).toBeTruthy();
  });
});
