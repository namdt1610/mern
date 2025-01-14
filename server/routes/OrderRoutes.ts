import express from 'express'
import orderController from '../controllers/OrderController'

const router = express.Router()

// Create new order
router.post('/', orderController.createOrder)

// Get all orders
router.get('/', orderController.getAllOrders)

// Get single order by ID
router.get('/:id', orderController.getOrderById)

// Get orders by user ID
router.get('/user/:id', orderController.getOrdersByUserId)

// Update order
router.put('/:id', orderController.updateOrder)

// Update order status
router.patch('/:id/status', orderController.updateOrderStatus)

// Delete order
router.delete('/:id', orderController.deleteOrder)

export default router

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by id
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/orders/{id}:
 *   put:
 *     summary: Update order
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/orders/{id}/status:
 *   patch:
 *     summary: Update order status
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete order
 *     responses:
 *       '200':
 *         description: A successful response
 *
 */
