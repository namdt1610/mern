const express = require('express')
const router = express.Router()
const authController = require('../controllers/AuthController')
const userController = require('../controllers/admin/UserController')

// Auth routes
router.post('/auth/login', authController.login)
router.post('/auth/register', authController.register)

// User routes
router.get('/users', userController.getAllUsers)
router.get('/users/:id', userController.getUserById)

// Product routes
// router.get('/products', productController.getAllProducts)
// router.get('/products/:id', productController.getProductById)

module.exports = router
