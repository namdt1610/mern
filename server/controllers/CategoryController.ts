import { Request, Response } from 'express'
import Category from '../models/categoryModel'

// GET all categories
const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find().sort({ name: 1 })
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to get categories',
            error: (error as Error).message, // Chuyển đổi error thành kiểu Error
        })
    }
}

// POST a category
const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body

        // Check if the name is provided
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Category name is required',
            })
        }

        // Check if category already exists
        const existingCategory = await Category.findOne({ name })
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: `${name} category already exists`,
            })
        }

        const category = await Category.create({ name })

        res.status(201).json({ success: true, category })
    } catch (error) {
        console.error(error)
        if (error instanceof Error && (error as any).code === 11000) {
            return res
                .status(400)
                .json({ success: false, message: 'Duplicate key error' })
        }
        res.status(500).json({
            success: false,
            message: (error as Error).message,
        })
    }
}

export { createCategory, getAllCategories }
