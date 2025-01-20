import { Request, Response } from 'express'
import Order from '../models/OrderModel'
import Inventory from '../models/InventoryModel'
import InventoryActivity from '../models/InventoryActivityModel'
import mongoose from 'mongoose'
import User from '../models/UserModel'
import { sendEmail } from '../utils/sendEmail'

export const OrderController = {
    // Create a new order
    createOrder: async (req: Request, res: Response) => {
        const session = await mongoose.startSession()
        session.startTransaction()

        try {
            const { items, ...orderData } = req.body
            const userId = req.body.user

            if (!items || !Array.isArray(items) || items.length === 0) {
                throw new Error('Order must contain at least one item')
            }

            // Check and update inventory for each item
            for (const item of items) {
                const inventory = await Inventory.findOne({
                    product: item.productId,
                })

                if (!inventory || inventory.quantity < item.quantity) {
                    res.status(400).json({ message: 'Insufficient stock' })
                    console.log('Insufficient stock for product', item.productId)
                    throw new Error(
                        `Insufficient stock for product ${item.productId}`
                    )
                }

                // Decrease stock
                const previousQuantity = inventory.quantity
                inventory.quantity -= item.quantity

                // Update status if quantity becomes 0
                if (inventory.quantity === 0) {
                    inventory.status = 'out-of-stock'
                }

                await inventory.save({ session })

                // Log activity
                await InventoryActivity.create(
                    [
                        {
                            product: item.productId,
                            action: 'remove',
                            quantity: item.quantity,
                            previousQuantity,
                            newQuantity: inventory.quantity,
                            updatedBy: 'order-system',
                        },
                    ],
                    { session }
                )
            }

            // Create the order
            const order = await Order.create([orderData], { session })

            // Send confirmation email
            const emailSubject = 'Order Confirmation'
            const emailText = `Thank you for your order! Your order ID is ${orderData._id}.`
            const emailHtml = `
            <h1>Thank you for your order!</h1>
            <p>Your order ID is <strong>${orderData._id}</strong>.</p>
            <p>Items:</p>
            <ul>
                ${items
                    .map(
                        (item: any) =>
                            `<li>${item.quantity} x ${item.name} - $${item.price}</li>`
                    )
                    .join('')}
            </ul>
            <p>Total Amount: $${orderData.totalPrice}</p>
        `

            await sendEmail(orderData.email, emailSubject, emailText, emailHtml)

            // Clear ordered items from user's cart
            await User.findByIdAndUpdate(
                userId,
                {
                    $pull: {
                        cart: {
                            productId: {
                                $in: items.map((item: any) => item.productId),
                            },
                        },
                    },
                },
                { session }
            )

            await session.commitTransaction()
            res.status(201).json(order[0])
        } catch (error: any) {
            await session.abortTransaction()
            res.status(500).json({
                message: 'Error creating order',
                error: error.message,
            })
        } finally {
            session.endSession()
        }
    },

    // Get all orders
    getAllOrders: async (req: Request, res: Response) => {
        try {
            const orders = await Order.find().populate('user', 'name')
            console.log('Orders: ', orders)
            res.status(200).json({
                message: 'Get all orders successfully',
                orders,
            })
        } catch (error) {
            res.status(500).json({ message: 'Error fetching orders', error })
            return
        }
    },

    // Get order by ID
    getOrderById: async (req: Request, res: Response): Promise<void> => {
        try {
            console.log('Order ID: ', req.params.id)
            const order = await Order.findById(req.params.id).populate({
                path: 'user',
                select: 'name phone email',
            })
            console.log('Oder: ', order)
            if (!order) {
                res.status(404).json({ message: 'Order not found' })
                return
            }
            res.status(200).json(order)
        } catch (error) {
            res.status(500).json({ message: 'Error fetching order', error })
            return
        }
    },

    // Get orders by user ID
    getOrdersByUserId: async (req: Request, res: Response): Promise<void> => {
        try {
            const orders = await Order.find({ user: req.params.id }).populate({
                path: 'user',
                select: 'name phone email',
            })
            if (!orders) {
                res.status(404).json({ message: 'Orders not found' })
                return
            }
            res.status(200).json(orders)
        } catch (error) {
            res.status(500).json({ message: 'Error fetching orders', error })
            return
        }
    },

    // Update order
    updateOrder: async (req: Request, res: Response): Promise<void> => {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            )
            if (!updatedOrder) {
                res.status(404).json({ message: 'Order not found' })
            }
            res.status(200).json(updatedOrder)
        } catch (error) {
            res.status(500).json({ message: 'Error updating order', error })
        }
    },

    // Update order status
    updateOrderStatus: async (req: Request, res: Response): Promise<void> => {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(
                req.params.id,
                { $set: { status: req.body.status } },
                { new: true }
            )
            if (!updatedOrder) {
                res.status(404).json({ message: 'Order not found' })
            }
            res.status(200).json(updatedOrder)
        } catch (error) {
            res.status(500).json({
                message: 'Error updating order status',
                error,
            })
        }
    },

    // Delete order
    deleteOrder: async (req: Request, res: Response): Promise<void> => {
        try {
            const deletedOrder = await Order.findByIdAndDelete(req.params.id)
            if (!deletedOrder) {
                res.status(404).json({ message: 'Order not found' })
            }
            res.status(200).json({ message: 'Order deleted successfully' })
        } catch (error) {
            res.status(500).json({ message: 'Error deleting order', error })
        }
    },
}

export default OrderController
