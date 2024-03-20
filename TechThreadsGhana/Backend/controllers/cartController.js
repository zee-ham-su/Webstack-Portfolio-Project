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

  getCart: async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.cartId).populate('items.product');
      console.log('Retrieved cart:', cart);
    
      if (!cart) {
        console.log('Cart not found');
        return res.status(404).json({ message: 'Cart not found' });
      }

      console.log('Cart fetched successfully');
      res.json(cart);
    } catch (error) {
      console.error('Error fetching cart:', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  updateCartItem: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      console.log('Updating cart item:', { id, quantity });

      // Find the cart and the item
      const cart = await Cart.findById(id).populate('items.product');
      if (!cart) {
        console.log('Cart not found');
        return res.status(404).json({ message: 'Cart not found' });
      }

      const item = cart.items.find(item => item._id.equals(req.params.id));
      if (!item) {
        console.log('Item not found in cart');
        return res.status(404).json({ message: 'Item not found in cart' });
      }

      // Check if product price is available
      if (!item.product || !item.product.price) {
        console.log('Product price not available');
        return res.status(400).json({ message: 'Product price not available' });
      }

      // Update quantity and total price
      console.log('Updating item quantity and total price');
      cart.totalPrice += (quantity - item.quantity) * item.product.price;
      item.quantity = quantity;

      // Save the updated cart
      await cart.save();

      console.log('Cart item updated successfully');
      res.json(cart);
    } catch (error) {
      console.error('Error updating cart item:', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const { cartId, itemId } = req.params;

      console.log('Removing item from cart:', { cartId, itemId });

      // Find the cart
      const cart = await Cart.findById(cartId);
      if (!cart) {
        console.log('Cart not found');
        return res.status(404).json({ message: 'Cart not found' });
      }

      // Find the item in the cart and remove it
      const itemIndex = cart.items.findIndex(item => item._id.equals(itemId));
      if (itemIndex === -1) {
        console.log('Item not found in cart');
        return res.status(404).json({ message: 'Item not found in cart' });
      }

      // Update the cart: remove the item and update total price
      const removedItem = cart.items.splice(itemIndex, 1)[0];
      console.log('Removed item:', removedItem);
      if (removedItem.product && typeof removedItem.product.price === 'number') {
        cart.totalPrice -= removedItem.quantity * removedItem.product.price;
      } else {
        console.log('Product price is not available or is not a number');
        cart.totalPrice = 0;
      }

      // Save the updated cart
      await cart.save();

      console.log('Item removed from cart successfully');
      res.json(cart);
    } catch (error) {
      console.error('Error removing item from cart:', error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = CartController;
