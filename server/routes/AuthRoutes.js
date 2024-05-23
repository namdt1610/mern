const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

// Route đăng ký
router.post('/register', authController.register);

// Route đăng nhập
router.post('/login', authController.login);

// Route làm mới token (nếu có)
router.post('/refresh-token', authController.refreshToken);

module.exports = router;
