import express from 'express'
import inventoryController from '../controllers/InventoryController'

const router = express.Router()

// Activity route should come before dynamic routes
router.get('/activity', inventoryController.getActivities)

// Stock management routes
router.post('/:productId/add', inventoryController.addStock)
router.post('/:productId/remove', inventoryController.removeStock)

// Inventory management routes
router.post('/', inventoryController.createInventory)
router.get('/', inventoryController.getAllInventory)
router.get('/:productId', inventoryController.getInventoryByProductId)
router.put('/:productId', inventoryController.updateInventory)
router.delete('/:productId', inventoryController.deleteInventory)

export default router

/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Get all inventory
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/inventory/{productId}:
 *   post:
 *     summary: Add stock
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/inventory/{productId}/remove:
 *   post:
 *     summary: Remove stock
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/inventory/{productId}:
 *   put:
 *     summary: Update inventory
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/inventory/{productId}:
 *   delete:
 *     summary: Delete inventory
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/inventory/activity:
 *   get:
 *     summary: Get activity
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/inventory/{productId}/add:
 *   post:
 *     summary: Add stock
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/inventory/{productId}/remove:
 *   post:
 *     summary: Remove stock
 *     responses:
 *       '200':
 *         description: A successful response
 *
 */
