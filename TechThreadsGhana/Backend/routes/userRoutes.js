const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Define routes for user CRUD operations
router.post('/register', UserController.register);
router.post('/login', UserController.userLogin);
router.get('/profile', authMiddleware.authenticateToken, UserController.getUserProfile);
router.put('/update-profile', authMiddleware.authenticateToken, UserController.updateUserProfile);
router.put('/change-password', authMiddleware.authenticateToken, UserController.changePassword);
router.get('/logout', UserController.logout);

module.exports = router;
