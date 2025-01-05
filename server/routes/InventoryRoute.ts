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
