import {describe, beforeAll, afterAll, it, expect} from "vitest";
const mongoose = require('mongoose');
const Cart = require('../../models/cart'); // Directory of carts.js

describe('Cart model', () => {
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

  it('should create a new cart with default values', async () => {
    const cart = new Cart();
    expect(cart.totalPrice).toBe(0);
    expect(cart.items).toHaveLength(0);
    expect(cart.createdAt).toBeTruthy();
    expect(cart.updatedAt).toBeTruthy();
  });

  it('should add an item to the cart', async () => {
    const productId = new mongoose.Types.ObjectId();
    const cart = new Cart();
    cart.items.push({ product: productId, quantity: 2 });
    await cart.save();

    const foundCart = await Cart.findById(cart._id);
    expect(foundCart.items).toHaveLength(1);
    expect(foundCart.items[0].product.toString()).toBe(productId.toString());
    expect(foundCart.items[0].quantity).toBe(2);
  });
});