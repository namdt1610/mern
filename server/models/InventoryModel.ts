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
        quantity: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },
        status: {
            type: String,
            enum: ['in-stock', 'out-of-stock', 'discontinued'],
            default: 'out-of-stock',
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

// Update status based on quantity
inventorySchema.pre('save', function (next) {
    if (this.quantity > 0) {
        this.status = 'in-stock'
    } else {
        this.status = 'out-of-stock'
    }
    this.lastUpdated = new Date()
    next()
})

const Inventory = mongoose.model<InventoryDocument>(
    'Inventory',
    inventorySchema
)
export default Inventory
