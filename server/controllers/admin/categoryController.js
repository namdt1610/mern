const Category = require('../../models/categoryModel')
const mongoose = require('mongoose')

// GET all categories
const getAllCategories = async (req, res) => {
    const categories = await Category.find({}).sort({ createdAt: -1 })
    res.status(200).json(categories)
}

// GET a category by id
const getCategoryById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid category id' })
    }
    const category = await Category.findById(id)

    if (!category) {
        return res
            .status(404)
            .json({ message: `Category with id ${id} not found` })
    }

    res.status(200).json(category)
}

// POST a category
const createCategory = async (req, res) => {
    const newCategory = new Category({
        name: 'Electronics',
        imageUrl: 'http://example.com/image.png',
    })

    try {
        await newCategory.save()
        res.send('Category saved')
    } catch (error) {
        res.status(500).send(error.message)
    }

    //     const { name, imageUrl } = req.body

    //     let emtyFields = []

    //     if (!name) {
    //         emtyFields.push('name')
    //     }
    //     if (!imageUrl) {
    //         emtyFields.push('imageUrl')
    //     }
    //     if (emtyFields.length > 0) {
    //         return res
    //             .status(400)
    //             .json({ error: `Please provide ${emtyFields.join(', ')}` })
    //     }
    //     try {
    //         const category = await Category.create({
    //             name,
    //             imageUrl,
    //         })
    //         res.status(200).json(category)
    //     } catch (error) {
    //         res.status(400).json({ error: error.message })
    //     }
}

// DELETE a category by id
const deleteCategory = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid category id' })
    }

    const category = await Category.findOneAndDelete({ _id: id })

    if (!category) {
        return res
            .status(400)
            .json({ error: `Category with id ${id} not found` })
    }

    res.status(200).json(category)
}
// UPDATE a category by id
const updateCategory = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid category id' })
    }

    const category = await Category.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    )

    if (!category) {
        return res
            .status(400)
            .json({ error: `Category with id ${id} not found` })
    }

    res.status(200).json(category)
}

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    deleteCategory,
    updateCategory,
}
