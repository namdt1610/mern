const express = require('express');
const router = express.Router();
const userController = require('../../controllers/admin/UserController');

// Routes cho đăng nhập, đăng ký và làm mới token
router.post('/login', userController.loginUser);
router.post('/signup', userController.signUpUser);

module.exports = router;
