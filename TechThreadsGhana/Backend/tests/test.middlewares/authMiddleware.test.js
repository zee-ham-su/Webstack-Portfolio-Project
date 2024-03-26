// Importing required modules
const jwt = require('jsonwebtoken');
const authMiddleware = require('../../middlewares/authMiddleware');

// Mocking the jsonwebtoken module
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(), // Mocking the verify function
}));

// Describing test suite for authMiddleware
describe('authMiddleware', () => {
  // Setting up mock request and response objects
  let req;
  let res;
  const next = jest.fn(); // Mocking next function

  // Before each test, clear all mocks
  beforeEach(() => {
    jest.clearAllMocks();
    // Initialize mock request and response objects
    req = {
      headers: {}, // Mocking headers object
    };
    res = {
      sendStatus: jest.fn(), // Mocking sendStatus function
    };
  });

  // Test for valid token scenario
  it('should call next() if token is valid', () => {
    // Setting up test data
    const token = 'validToken';
    const decodedToken = { username: 'user' };
    req.headers.authorization = `Bearer ${token}`; // Setting authorization header
    // Mocking jwt.verify function to return decoded token
    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(null, decodedToken);
    });

    // Calling authenticateToken middleware function
    authMiddleware.authenticateToken(req, res, next);

    // Expecting req.user to be equal to decoded token and next to be called
    expect(req.user).toEqual(decodedToken);
    expect(next).toHaveBeenCalledTimes(1);
  });

  // Test for scenario where no token is provided
  it('should return 401 if no token provided', () => {
    // Calling authenticateToken middleware function without setting authorization header
    authMiddleware.authenticateToken(req, res, next);

    // Expecting res.sendStatus to be called with 401 and next not to be called
    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();

    // Also, verify that jwt.verify was not called
    expect(jwt.verify).not.toHaveBeenCalled();
  });

  // Test for scenario where token is invalid
  it('should return 403 if token is invalid', () => {
    // Setting up test data
    const token = 'invalidToken';
    req.headers.authorization = `Bearer ${token}`; // Setting authorization header
    // Mocking jwt.verify function to return error
    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(new Error('Invalid token'));
    });

    // Calling authenticateToken middleware function
    authMiddleware.authenticateToken(req, res, next);

    // Expecting res.sendStatus to be called with 403 and next not to be called
    expect(res.sendStatus).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});
