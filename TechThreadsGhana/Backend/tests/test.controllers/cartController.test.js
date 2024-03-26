const CartController = require('../../controllers/cartController');
const mongoose = require('mongoose');

// Set up MongoDB connection before running tests
beforeAll(async () => {
  await mongoose.connect('mongodb+srv://hamzasufian2014:DafBrscdZELfxbvc@cluster0.nmmyd8v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

describe('Cart Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };
    next = jest.fn();
  });

  describe('addToCart', () => {
    it('should add items to cart', async () => {
      req.body = {
        items: [{ product: 'mockProductId', quantity: 2 }],
      };

      await CartController.addToCart(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ items: expect.any(Array) }));
    });
  });
});

// Close MongoDB connection after all tests are done
afterAll(async () => {
    await mongoose.connection.close();
  });