const Product = require('../../models/productModel')
const mongoose = require('mongoose')

// GET all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 })
        const totalProducts = await Product.countDocuments()
        res.status(200).json({ products, totalProducts })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error: Unable to get products',
            error: error.message,
        })
    }
}

// GET a product by id
const getProductById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid product id' })
    }
    const product = await Product.findById(id)

    if (!product) {
        return res
            .status(404)
            .json({ message: `Product with id ${id} not found` })
    }

    res.status(200).json(product)
}

// POST a product
const createProduct = async (req, res) => {
    const { name, description, price } = req.body

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null

    let emptyFields = []

    if (!name) emptyFields.push('name')
    if (!description) emptyFields.push('description')
    if (!price) emptyFields.push('price')
    if (!imageUrl) emptyFields.push('imageUrl')

    if (emptyFields.length > 0) {
        return res
            .status(400)
            .json({ error: `Please provide ${emptyFields.join(', ')}` })
    }
    try {
        const product = await Product.create({
            name,
            description,
            price,
            imageUrl,
        })
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// DELETE a product by id
const deleteProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid product id' })
    }

    const product = await Product.findOneAndDelete({ _id: id })

    if (!product) {
        return res
            .status(400)
            .json({ error: `Product with id ${id} not found` })
    }

    res.status(200).json(product)
}

// UPDATE a product by id
const updateProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid product id' })
    }

    const product = await Product.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    )

    if (!product) {
        return res
            .status(400)
            .json({ error: `Product with id ${id} not found` })
    }

    res.status(200).json(product)
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
    updateProduct,
}
