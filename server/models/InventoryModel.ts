import mongoose from 'mongoose'

const schema = mongoose.Schema

export interface IInventory extends Document {
      name: string
      description: string
      quantity: number
      price: number
      category: string
      status: string
      sku: string
      supplier?: string
}

const inventorySchema = new schema(
      {
            name: {
                  type: String,
                  required: true,
            },
            description: {
                  type: String,
                  required: false,
                  default: null,
            },
            quantity: {
                  type: Number,
                  required: true,
                  default: 0,
            },
            price: {
                  type: Number,
                  required: true,
                  default: 0,
            },
            category: {
                  type: String,
                  required: true,
            },
            status: {
                  type: String,
                  enum: ['in-stock', 'out-of-stock', 'discontinued'],
                  default: 'in-stock',
            },
            sku: {
                  type: String,
                  required: true,
                  unique: true,
            },
            supplier: {
                  type: String,
                  required: false,
                  default: null,
            },
            createAt: {
                  type: Date,
                  default: Date.now,
            },
            updateAt: {
                  type: Date,
                  default: Date.now,
            },
      },
      {
            timestamps: true,
      }
)

// Static method to create new inventory item
inventorySchema.statics.createItem = async function(itemData: IInventory) {
      const exists = await this.findOne({ sku: itemData.sku })
      if (exists) {
            throw Error('SKU already exists')
      }
      
      const item = await this.create(itemData)
      return item
}

// Static method to update stock quantity
inventorySchema.statics.updateStock = async function(sku: string, quantity: number) {
      const item = await this.findOne({ sku })
      if (!item) {
            throw Error('Item not found')
      }

      item.quantity = quantity
      item.status = quantity > 0 ? 'in-stock' : 'out-of-stock'
      await item.save()
      return item
}

const Inventory = mongoose.model('Inventory', inventorySchema)
export default Inventory