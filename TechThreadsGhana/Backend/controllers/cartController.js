const Cart = require('../models/cart');
const { Product } = require('../controllers/productController');
const mongoose = require('mongoose');


const CartController = {
  addToCart: async (req, res) => {
  try {
    const { user, items } = req.body;

    console.log('Adding to cart:', { user, items });

    let cart = await Cart.findOne({ user });
    if (!cart) {
      console.log('Cart not found, creating new cart');
      cart = new Cart({ user });
    }

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
      const userId = req.user.userId;
      const userObjectId = new mongoose.Types.ObjectId(userId);
      console.log('Fetching cart for user:', userId);

      const cart = await Cart.findOne({ user: userObjectId }).populate('items.product');
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
      const cart = await Cart.findById(id);
      if (!cart) {
        console.log('Cart not found');
        return res.status(404).json({ message: 'Cart not found' });
      }

      const item = cart.items.find(item => item._id.equals(req.params.id));
      if (!item) {
        console.log('Item not found in cart');
        return res.status(404).json({ message: 'Item not found in cart' });
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
    const { id } = req.params;

    console.log('Removing item from cart:', id);

    // Find the cart
    const cart = await Cart.findById(id);
    if (!cart) {
      console.log('Cart not found');
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the item
    const itemIndex = cart.items.findIndex(item => item._id.equals(id));
    if (itemIndex === -1) {
      console.log('Item not found in cart');
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    const removedItem = cart.items.splice(itemIndex, 1)[0];
    cart.totalPrice -= removedItem.quantity * removedItem.product.price;

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