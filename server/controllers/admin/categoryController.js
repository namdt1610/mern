const Category = require('../../models/categoryModel')
const mongoose = require('mongoose')

// GET all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).sort({ createdAt: -1 })
        const totalCategories = await Category.countDocuments()
        res.status(200).json({ categories, totalCategories })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error: Unable to get categories',
            error: error.message,
        })
    }
}

// POST a category
const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        console.log(req.body)
        const existingCategory = await Category.findOne({ name })

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                error: `${name} category already exists`,
            })
        }

        const category = await Category.create({ name })
        await category.save()

        res.status(201).json({ success: true, category: category })
        res.send(`${category.name} has been created`)
    } catch (error) {
        if (error.code === 11000) {
            return res
                .status(400)
                .json({ success: false, message: 'Duplicate key error' })
        }
        res.status(500).send(error.message)
    }
}

module.exports = {
    createCategory,
    getAllCategories,
}
