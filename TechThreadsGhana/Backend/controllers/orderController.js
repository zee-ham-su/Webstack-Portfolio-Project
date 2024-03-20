const Order = require('../models/Order');

const orderController = {
    // Create a new order
    async createOrder(req, res) {
        try {
            console.log('Request body:', req.body);

            const { products, status } = req.body;

            // Validate products array
            if (!Array.isArray(products) || products.length === 0) {
                return res.status(400).json({ msg: 'Products array is empty or invalid' });
            }

            // Calculate total amount based on product prices and quantities
            let totalAmount = 0;
            for (const product of products) {
                console.log('Product:', product);
                if (!product.price || !product.quantity || isNaN(product.price) || isNaN(product.quantity)) {
                    return res.status(400).json({ msg: 'Invalid product data' });
                }
                totalAmount += product.price * product.quantity;
            }
            console.log('Total amount:', totalAmount);

            // Create new order
            const order = new Order({ products, totalAmount, status });
            console.log('New order:', order);
            await order.save();
            console.log('Order saved successfully');
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
