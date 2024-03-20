const Cart = require('../models/cart');
const { Product } = require('../controllers/productController');
const mongoose = require('mongoose');

const CartController = {
  addToCart: async (req, res) => {
    try {
      const { items } = req.body;

      console.log('Adding to cart:', items);

      let cart = new Cart();

      for (const item of items) {
        const { product: productId, quantity } = item;

        const productDetails = await Product.findById(productId);
        if (!productDetails) {
          console.log(`Product with ID ${productId} not found`);
          continue; // Skip this product and proceed with the next one
        }

        const existingItemIndex = cart.items.findIndex(item => item.product.equals(productId));
        if (existingItemIndex !== -1) {
          console.log('Product already in cart, updating quantity');
          cart.items[existingItemIndex].quantity += quantity;
        } else {
          console.log('Product not in cart, adding');
          cart.items.push({ product: productId, quantity });
        }

        // Update total price
        const productPrice = productDetails.price || 0;
        cart.totalPrice += quantity * productPrice;
      }

      // Save the cart
      await cart.save();

      console.log('Cart updated successfully');
      res.status(201).json(cart);
    } catch (error) {
      console.error('Error adding to cart:', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  getAllCarts: async (req, res) => {
    try {
      const carts = await Cart.find(); // Retrieve all carts
      console.log('Retrieved all carts:', carts);
      
      res.json(carts);
    } catch (error) {
      console.error('Error fetching carts:', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  updateCartItem: async (req, res) => {
  try {
    const { cartId, itemId, quantity } = req.body;
    console.log('Updating cart item:', { cartId, itemId, quantity });

    // Validate input data
    if (!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(itemId)) {
      console.log('Invalid cart or item ID');
      return res.status(400).json({ message: 'Invalid cart or item ID' });
    }

    // Find the cart by ID
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the index of the item in the cart
    const itemIndex = cart.items.findIndex(item => item._id.equals(itemId));
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Update the quantity of the item
    cart.items[itemIndex].quantity = quantity;

    // Update the total price of the cart
    cart.totalPrice = 0;
    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      const productPrice = product.price || 0;
      cart.totalPrice += item.quantity * productPrice;
    }

    // Save the updated cart
    await cart.save();

    console.log('Cart item updated successfully');
    res.json(cart);
  } catch (error) {
    console.error('Error updating cart item:', error.message);
    res.status(500).json({ message: error.message });
  }
},

  deleteCartItem: async (req, res) => {
    try {
      const { cartId, itemId } = req.params;
      console.log('Deleting cart item:', { cartId, itemId });

      // Find the cart by ID
      const cart = await Cart.findById(cartId);
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      // Remove the item from the cart's items array
      cart.items = cart.items.filter(item => item._id.toString() !== itemId);

      // Recalculate the total price
      cart.totalPrice = cart.items.reduce((total, item) => total + (item.quantity * item.product.price), 0);

      // Save the updated cart
      await cart.save();

      return res.json({ message: 'Item deleted from cart', cart });
    } catch (error) {
      console.error('Error deleting cart item:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  deleteCart: async (req, res) => {
    try {
      const { cartId } = req.params;
      console.log('Deleting cart:', cartId);

      // Find the cart by ID and delete it
      const deletedCart = await Cart.findByIdAndDelete(cartId);
      if (!deletedCart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      return res.json({ message: 'Cart deleted successfully', deletedCart });
    } catch (error) {
      console.error('Error deleting cart:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = CartController;
