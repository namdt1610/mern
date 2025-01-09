import { Router } from 'express'
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateClickCount,
    updateProduct,
} from '../controllers/ProductController'

const router = Router()

router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.post('/', createProduct)
router.delete('/:id', deleteProduct)
router.patch('/:id', updateProduct)
router.patch('/:id/click', updateClickCount)

export default router

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/products/{id}:
 *   get:
 *     summary: Get product by id
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/products/{id}:
 *   post:
 *     summary: Create product
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/products/{id}:
 *   patch:
 *     summary: Update product
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/products/{id}/click:
 *   patch:
 *     summary: Update click count
 *     responses:
 *       '200':
 *         description: A successful response
 *
 */
