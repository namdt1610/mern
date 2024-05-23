// const Product = require('../../models/Product')

// // Controller cho quản lý sản phẩm bởi admin
// exports.getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.find()
//         res.status(200).json(products)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: 'Error retrieving products' })
//     }
// }

// exports.getProductById = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id)
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' })
//         }
//         res.status(200).json(product)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: 'Error retrieving product' })
//     }
// }

// exports.createProduct = async (req, res) => {
//     try {
//         const product = new Product(req.body)
//         await product.save()
//         res.status(201).json(product)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: 'Error creating product' })
//     }
// }

// exports.updateProduct = async (req, res) => {
//     try {
//         const updates = req.body
//         const product = await Product.findByIdAndUpdate(
//             req.params.id,
//             updates,
//             { new: true }
//         )
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' })
//         }
//         res.status(200).json(product)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: 'Error updating product' })
//     }
// }

// exports.deleteProduct = async (req, res) => {
//     try {
//         const product = await Product.findByIdAndDelete(req.params.id)
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' })
//         }
//         res.status(200).json({ message: 'Product deleted successfully' })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: 'Error deleting product' })
//     }
// }
// const Product = require('../../models/Product')

// // Controller cho quản lý sản phẩm bởi admin
// exports.getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.find()
//         res.status(200).json(products)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: 'Error retrieving products' })
//     }
// }

// exports.getProductById = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id)
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' })
//         }
//         res.status(200).json(product)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: 'Error retrieving product' })
//     }
// }

// exports.createProduct = async (req, res) => {
//     try {
//         const product = new Product(req.body)
//         await product.save()
//         res.status(201).json(product)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: 'Error creating product' })
//     }
// }

// exports.updateProduct = async (req, res) => {
//     try {
//         const updates = req.body
//         const product = await Product.findByIdAndUpdate(
//             req.params.id,
//             updates,
//             { new: true }
//         )
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' })
//         }
//         res.status(200).json(product)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: 'Error updating product' })
//     }
// }

// exports.deleteProduct = async (req, res) => {
//     try {
//         const product = await Product.findByIdAndDelete(req.params.id)
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' })
//         }
//         res.status(200).json({ message: 'Product deleted successfully' })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: 'Error deleting product' })
//     }
// }
