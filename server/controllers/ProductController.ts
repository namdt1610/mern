import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Product from '../models/ProductModel'

// GET all products
const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find({}).sort({ name: 1 })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({
            message: 'Server Error: Unable to get products',
            error: (error as Error).message,
        })
    }
}

// GET a product by id
const getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: 'Invalid product id' })
        return
    }
    const product = await Product.findById(id)

    if (!product) {
        res.status(404).json({ message: `Product with id ${id} not found` })
        return
    }

    res.status(200).json(product)
}

// POST a product
const createProduct = async (req: Request, res: Response): Promise<void> => {
    const { name, description, price } = req.body
    const imageUrl = req.file ? `/uploads${req.file.filename}` : null

    let emptyFields: string[] = []

    if (!name) emptyFields.push('name')
    if (!description) emptyFields.push('description')
    if (!price) emptyFields.push('price')
    if (!imageUrl) emptyFields.push('imageUrl')

    if (emptyFields.length > 0) {
        res.status(400).json({
            error: `Please provide ${emptyFields.join(', ')}`,
        })
        return
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
        res.status(400).json({ error: (error as Error).message })
    }
}

// DELETE a product by id
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: 'Invalid product id' })
        return
    }

    const product = await Product.findOneAndDelete({ _id: id })

    if (!product) {
        res.status(400).json({ error: `Product with id ${id} not found` })
        return
    }

    res.status(200).json(product)
}

// UPDATE a product by id
const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: 'Invalid product id' })
        return
    }

    const product = await Product.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        },
        { new: true }
    )

    if (!product) {
        res.status(400).json({ error: `Product with id ${id} not found` })
        return
    }

    res.status(200).json(product)
}

// Update click count
export const updateClickCount = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: 'Invalid product id' })
        return
    }

    const product = await Product.findById(id)

    if (!product) {
        res.status(404).json({ error: `Product with id ${id} not found` })
        return
    }

    product.clickCount += 1
    await product.save()

    res.status(200).json(product)

}

export {
    createProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
    updateProduct,
}
