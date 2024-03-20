const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
