import express from 'express'
import orderController from '../controllers/OrderController'

const router = express.Router()

// Create new order
router.post('/', orderController.createOrder)

// Get all orders
router.get('/', orderController.getAllOrders)

// Get single order by ID
router.get('/:id', orderController.getOrderById)

// Update order
router.put('/:id', orderController.updateOrder)

// Update order status
router.patch('/:id/status', orderController.updateOrderStatus)

// Delete order
router.delete('/:id', orderController.deleteOrder)

export default router