const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  paymentMethod: { type: String, required: true },
  transactionId: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  amount: { type: Number, required: true },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
