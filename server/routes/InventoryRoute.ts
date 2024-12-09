import express from 'express'
import inventoryController from '../controllers/InventoryController'

const router = express.Router()

// Create new inventory item
router.post('/', inventoryController.createInventory)

// Get all inventory items
router.get('/', inventoryController.getAllInventory)

// Get single inventory item by SKU
router.get('/:sku', inventoryController.getInventoryBySku)

// Update inventory item
router.put('/:sku', inventoryController.updateInventory)

// Update stock quantity
router.patch('/:sku/stock', inventoryController.updateStock)

// Delete inventory item
router.delete('/:sku', inventoryController.deleteInventory)

export default router