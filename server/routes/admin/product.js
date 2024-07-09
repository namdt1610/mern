const express = require('express')
const {
    createProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
    updateProduct,
} = require('../../controllers/admin/productController')

const router = express.Router()

// GET all products
router.get('/', getAllProducts)

// GET a product by id
router.get('/:id', getProductById)

// POST a product
router.post('/', createProduct)

// DELETE a product by id
router.delete('/:id', deleteProduct)

// UPDATE a product by id
router.patch('/:id', updateProduct)

module.exports = router
