const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/admin/DashboardController');
const userController = require('../controllers/admin/UserController');
const productController = require('../controllers/admin/ProductController');
const orderController = require('../controllers/admin/OrderController');

// Route cho Admin dashboard
// router.get('/dashboard', dashboardController.getDashboard);

// Routes cho quản lý người dùng
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Routes cho quản lý sản phẩm
// router.get('/products', productController.getAllProducts);
// router.get('/products/:id', productController.getProductById);
// router.post('/products', productController.createProduct);
// router.put('/products/:id', productController.updateProduct);
// router.delete('/products/:id', productController.deleteProduct);

// Routes cho quản lý đơn hàng
// router.get('/orders', orderController.getAllOrders);
// router.get('/orders/:id', orderController.getOrderById);
// router.post('/orders', orderController.createOrder);
// router.put('/orders/:id', orderController.updateOrder);
// router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;
