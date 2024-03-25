import {describe, beforeAll, afterAll, it, expect} from "vitest";
const mongoose = require('mongoose');
const Order = require('../../models/Order'); // Directory of order.js

describe('Order model', () => {
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

  it('should create a new order with required fields', async () => {
    const product1Id = new mongoose.Types.ObjectId();
    const product2Id = new mongoose.Types.ObjectId();
    const orderData = {
      products: [
        { productId: product1Id, quantity: 2 },
        { productId: product2Id, quantity: 1 }
      ],
      totalAmount: 35.99,
    };
    const order = new Order(orderData);
    await order.save();

    const foundOrder = await Order.findById(order._id);
    expect(foundOrder.products).toHaveLength(2);
    expect(foundOrder.products[0].productId.toString()).toBe(product1Id.toString());
    expect(foundOrder.products[0].quantity).toBe(2);
    expect(foundOrder.products[1].productId.toString()).toBe(product2Id.toString());
    expect(foundOrder.products[1].quantity).toBe(1);
    expect(foundOrder.totalAmount).toBe(orderData.totalAmount);
    expect(foundOrder.status).toBe('pending'); // Default status
    expect(foundOrder.createdAt).toBeTruthy();
    expect(foundOrder.updatedAt).toBeTruthy();
  });
});