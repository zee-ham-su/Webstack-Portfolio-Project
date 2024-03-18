const Payment = require('../models/payment');

const PaymentController = {
  async processPayment(req, res) {
    try {
      const { orderId, paymentMethod, transactionId, amount } = req.body;

      // Create a new payment record
      const payment = new Payment({
        order: orderId,
        paymentMethod,
        transactionId,
        amount,
        status: 'completed'
      });

      await payment.save();

      return res.status(201).json(payment);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }
};

module.exports = PaymentController;
