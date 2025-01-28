import { Request, Response } from 'express'
import Order from '../models/OrderModel'
import Inventory from '../models/InventoryModel'
import InventoryActivity from '../models/InventoryActivityModel'
import mongoose from 'mongoose'
import User from '../models/UserModel'
import { sendEmail } from '../utils/sendEmail'

export const OrderController = {
    getAllOrders: async (req: Request, res: Response): Promise<void> => {
        try {
            const cacheKey = 'orders:all'

            const orders = await Order.find().populate('user', 'name')
            console.log('Orders: ', orders)
            res.status(200).json({
                success: true,
                message: 'Get all orders successfully',
                orders,
            })
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error fetching orders',
                error: error.message,
            })
            return
        }
    },

    getOrderById: async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id

            const order = await Order.findById(req.params.id).populate({
                path: 'user',
                select: 'name phone email',
            })
            console.log('Oder: ', order)
            if (!order) {
                res.status(404).json({
                    success: false,
                    message: 'Order not found',
                })
                return
            }
            res.status(200).json({
                success: true,
                message: 'Get order by ID successfully',
                order,
            })
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error fetching order',
                error: error.message,
            })
            return
        }
    },

    getOrdersByUserId: async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id

            const orders = await Order.find({ id }).populate({
                path: 'user',
                select: 'name phone email',
            })
            if (!orders) {
                res.status(404).json({ message: 'Orders not found' })
                return
            }

            res.status(200).json({
                success: true,
                message: 'Get orders by user ID successfully',
                orders,
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching orders',
                error,
            })
            return
        }
    },

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
                    console.log(
                        'Insufficient stock for product',
                        item.productId
                    )
                    throw new Error(
                        `Insufficient stock for product ${item.productId}`
                    )
                }

                // Decrease stock
                const previousQuantity = inventory.quantity
                inventory.quantity -= item.quantity

                // Update status if quantity becomes 0

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

            res.status(201).json({
                success: true,
                message: 'Order created successfully',
                order: order[0],
            })
        } catch (error: any) {
            await session.abortTransaction()
            res.status(500).json({
                success: false,
                message: 'Error creating order',
                error: error.message,
            })
        } finally {
            session.endSession()
        }
    },

    updateOrder: async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id
            const updatedOrder = await Order.findByIdAndUpdate(
                id,
                { $set: req.body },
                { new: true }
            )
            if (!updatedOrder) {
                res.status(404).json({
                    success: false,
                    message: 'Order not found',
                })
            }

            res.status(200).json({
                success: true,
                message: 'Order updated successfully',
                updatedOrder,
            })
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error updating order',
                error: error.message,
            })
        }
    },

    updateOrderStatus: async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id
            const updatedOrder = await Order.findByIdAndUpdate(
                id,
                { $set: { status: req.body.status } },
                { new: true }
            )
            if (!updatedOrder) {
                res.status(404).json({ message: 'Order not found' })
            }

            res.status(200).json({
                success: true,
                message: 'Order status updated successfully',
                updatedOrder,
            })
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error updating order status',
                error: error.message,
            })
        }
    },

    deleteOrder: async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id
            const deletedOrder = await Order.findByIdAndDelete(id)
            if (!deletedOrder) {
                res.status(404).json({ message: 'Order not found' })
            }

            res.status(200).json({
                success: true,
                message: 'Order deleted successfully',
            })
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error deleting order',
                error: error.message,
            })
        }
    },
}

export default OrderController
