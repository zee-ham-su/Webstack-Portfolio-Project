const orderController = require('../../controllers/orderController');
const Order = require('../../models/Order');

// Mocking the request and response objects
const mockRequest = (body, params) => ({
    body,
    params
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

// Mocking the Order model functions
jest.mock('../../models/Order', () => ({
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
}));

describe('orderController', () => {
    describe('createOrder', () => {
        it('should create a new order', async () => {
            const req = mockRequest({
                products: [{ productId: 'mockProductId', quantity: 2 }],
                status: 'pending'
            });
            const res = mockResponse();

            // Mocking the Order.create function to return a resolved promise
            Order.create.mockResolvedValueOnce({
                products: [{ productId: 'mockProductId', quantity: 2 }],
                totalAmount: 100,
                status: 'pending'
            });

            await orderController.createOrder(req, res);

            expect(Order.create).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalled();
        });

        it('should return a 400 status if products array is empty or invalid', async () => {
            const req = mockRequest({
                products: [],
                status: 'pending'
            });
            const res = mockResponse();

            await orderController.createOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Products array is empty or invalid' });
        });
    });
});
