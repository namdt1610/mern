import {Request, Response} from 'express'
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

// GET a category by id
const getCategoryById = async (req: Request, res: Response) => {
    try {
        const category = await Category.findById(req.params.id)

        if (!category) {
            res.status(404).json({
                success: false,
                message: 'Category not found',
            })
        }

        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to get category',
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
            res.status(400).json({
                success: false,
                message: 'Category name is required',
            })
        }

        // Check if category already exists
        const existingCategory = await Category.findOne({ name })
        if (existingCategory) {
            res.status(400).json({
                success: false,
                message: `${name} category already exists`,
            })
        }

        const category = await Category.create({ name })

        res.status(201).json({ success: true, category })
    } catch (error) {
        console.error(error)
        if (error instanceof Error && (error as any).code === 11000) {
            res.status(400).json({
                success: false,
                message: 'Duplicate key error',
            })
        }
        res.status(500).json({
            success: false,
            message: (error as Error).message,
        })
    }
}

// DELETE a category
const deleteCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.findById(req.params.id)

        if (!category) {
            res.status(404).json({
                success: false,
                message: 'Category not found',
            })
        }

        await Category.deleteOne({ _id: req.params.id })

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully',
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: (error as Error).message,
        })
    }
}

const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, isActive, productsCount } = req.body
        console.log('Request body:', req.body)

        // Kiểm tra nếu không có name trong body request
        if (!name) {
            res.status(400).json({
                success: false,
                message: 'Category name is required',
            })
            return // Dừng hàm nếu không có tên category
        }

        // Tìm category theo ID
        const category = await Category.findById(req.params.id)
        if (!category) {
            res.status(404).json({
                success: false,
                message: `Category with ID ${req.params.id} not found`,
            })
            return
        }

        // Cập nhật thông tin category
        category.name = name
        category.isActive = isActive
        category.productsCount = productsCount

        // Lưu vào cơ sở dữ liệu
        await category.save()

        // Trả về thông tin category đã cập nhật
        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            category,
        })
    } catch (error) {
        // Trả về lỗi nếu có lỗi trong quá trình xử lý
        console.error('Error updating category:', error)
        res.status(500).json({
            success: false,
            message:
                (error as Error).message ||
                'An error occurred while updating the category.',
        })
    }
}

export {
    createCategory,
    getAllCategories,
    getCategoryById,
    deleteCategory,
    updateCategory,
}
