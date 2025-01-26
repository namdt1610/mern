import mongoose, { Schema } from 'mongoose'
import { Product } from '../../shared/types/Product'

interface InventoryDocument extends Document {
    product: Product['_id']
    quantity: number
    status: 'in-stock' | 'out-of-stock' | 'discontinued'
    lastUpdated: Date
}

const inventorySchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
            unique: true,
        },
        warehouse: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },
        lastUpdated: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
        autoIndex: true,
    }
)

// Drop any existing indexes and recreate only what we need
inventorySchema.index({ product: 1 }, { unique: true })

const Inventory = mongoose.model<InventoryDocument>(
    'Inventory',
    inventorySchema
)
export default Inventory
