import {Request, Response} from 'express'
import Inventory, {IInventory} from '../models/InventoryModel'

class InventoryController {
    // Create new inventory item
    async createInventory(req: Request, res: Response): Promise<void> {
        try {
            const itemData: IInventory = req.body
            const newItem = await Inventory.create(itemData)
            res.status(201).json(newItem)
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    }

    // Get all inventory items
    async getAllInventory(req: Request, res: Response): Promise<void> {
        try {
            const items = await Inventory.find({})
            res.status(200).json(items)
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

    // Get single inventory item by SKU
    async getInventoryBySku(req: Request, res: Response): Promise<void> {
        try {
            const { sku } = req.params
            const item = await Inventory.findOne({ sku })
            if (!item) {
                res.status(404).json({ error: 'Item not found' })
            }
            res.status(200).json(item)
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

    // Update inventory item
    async updateInventory(req: Request, res: Response): Promise<void> {
        try {
            const { sku } = req.params
            const updates = req.body
            const item = await Inventory.findOneAndUpdate(
                { sku },
                { ...updates, updateAt: Date.now() },
                { new: true }
            )
            if (!item) {
                res.status(404).json({ error: 'Item not found' })
            }
            res.status(200).json(item)
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    }

    // Update stock quantity
    async updateStock(req: Request, res: Response) {
        try {
            const { sku } = req.params
            const { quantity } = req.body
            const updatedItem = await Inventory.findByIdAndUpdate(sku, quantity)
            res.status(200).json(updatedItem)
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    }

    // Delete inventory item
    async deleteInventory(req: Request, res: Response): Promise<void> {
        try {
            const { sku } = req.params
            const item = await Inventory.findOneAndDelete({ sku })
            if (!item) {
                res.status(404).json({ error: 'Item not found' })
            }
            res.status(200).json({ message: 'Item deleted successfully' })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }
}

export default new InventoryController()
