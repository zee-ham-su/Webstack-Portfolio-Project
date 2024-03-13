const Order = require('../models/Order');

const orderController = {
    // Create a new order
    async createOrder(req, res) {
        try {
            const { user, products, totalAmount, status } = req.body;
            const order = new Order({ user, products, totalAmount, status });
            await order.save();
            return res.status(201).json({ msg: 'Order created successfully', order });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    },

    // Get all orders
    async getAllOrders(req, res) {
        try {
            const orders = await Order.find();
            return res.json(orders);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    },

    // Get an order by ID
    async getOrderById(req, res) {
        try {
            const orderId = req.params.id;
            const order = await Order.findById(orderId);
            if (!order) {
                return res.status(404).json({ msg: 'Order not found' });
            }
            return res.json(order);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    },

    // Update an order
    async updateOrder(req, res) {
        try {
            const orderId = req.params.id;
            const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, { new: true });
            if (!updatedOrder) {
                return res.status(404).json({ msg: 'Order not found' });
            }
            return res.json({ msg: 'Order updated successfully', order: updatedOrder });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    },

    // Delete an order
    async deleteOrder(req, res) {
        try {
            const orderId = req.params.id;
            const deletedOrder = await Order.findByIdAndDelete(orderId);
            if (!deletedOrder) {
                return res.status(404).json({ msg: 'Order not found' });
            }
            return res.json({ msg: 'Order deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
};

module.exports = orderController;
