const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        imageUrl: {
            type: String,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        stock: {
            type: Schema.Types.ObjectId,
            ref: 'Stock',
            required: true,
        },
    },
    { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)
export default Product
