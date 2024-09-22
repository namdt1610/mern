const mongoose = require('mongoose')

const Schema = mongoose.Schema

const stockSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
)

const Stock = mongoose.model('Stock', stockSchema)
module.exports = Stock
