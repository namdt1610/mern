import mongoose from 'mongoose'
import { Cart } from '../../shared/types/Cart'

const Schema = mongoose.Schema

const cartSchema = new Schema<Cart>(
    {
        user: {
            type: String,
            ref: 'User',
            required: true,
        },
        products: [
            {
                product: {
                    type: String,
                    ref: 'Product',
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                },
            },
        ],
        totalQuantity: {
            type: Number,
            required: true,
            default: 0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
)

const Cart = mongoose.model('Cart', cartSchema)
export default Cart
