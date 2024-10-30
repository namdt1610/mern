const express = require('express')
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    deleteCategory,
    updateCategory,
} = require('../controllers/CategoryController')

const router = express.Router()

// GET all categories
router.get('/', getAllCategories)

// GET a Category by id
// router.get('/:id', getCategoryById)

// POST a Category
router.post('/', createCategory)

// DELETE a Category by id
// router.delete('/:id', deleteCategory)

// UPDATE a Category by id
// router.patch('/:id', updateCategory)

export default router
