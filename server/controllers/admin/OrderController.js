// const Order = require('../../models/Order')

// // Controller cho quản lý đơn hàng bởi admin
// exports.getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.find()
//         res.status(200).json(orders)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: 'Error retrieving orders' })
//     }
// }

// exports.getOrderById = async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id)
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' })
//         }
//         res.status(200).json(order)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: 'Error retrieving order' })
//     }
// }

// exports.createOrder = async (req, res) => {
//     try {
//         const order = new Order(req.body)
//         await order.save()
//         res.status(201).json(order)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: 'Error creating order' })
//     }
// }

// exports.updateOrder = async (req, res) => {
//     try {
//         const updates = req.body
//         const order = await Order.findByIdAndUpdate(req.params.id, updates, {
//             new: true,
//         })
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' })
//         }
//         res.status(200).json(order)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: 'Error updating order' })
//     }
// }

// exports.deleteOrder = async (req, res) => {
//     try {
//         const order = await Order.findByIdAndDelete(req.params.id)
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' })
//         }
//         res.status(200).json({ message: 'Order deleted successfully' })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: 'Error deleting order' })
//     }
// }
