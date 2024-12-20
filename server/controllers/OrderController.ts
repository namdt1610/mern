import { Request, Response } from 'express'
import Order from '../models/OrderModel'

export const OrderController = {
    // Create a new order
    createOrder: async (req: Request, res: Response) => {
        try {
            console.log(req.body)
            const newOrder = new Order(req.body)
            const savedOrder = await newOrder.save()
            res.status(201).json(savedOrder)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Error creating order', error })
        }
    },

    // Get all orders
    getAllOrders: async (req: Request, res: Response) => {
        try {
            const orders = await Order.find()
            res.status(200).json(orders)
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
                select: 'name phone',
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
