const Product = require('../../models/productModel')
const mongoose = require('mongoose')

// GET all products
const getAllProducts = async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 })
    res.status(200).json(products)
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
    const { name, description, price, imageUrl } = req.body

    try {
        const product = await Product.create({
            name,
            description,
            price,
            imageUrl,   
        })
        res.status(200).json(product)
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
