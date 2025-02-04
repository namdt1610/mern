import { Router } from 'express'
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateClickCount,
    updateProduct,
} from '../controllers/ProductController'
import upload from '../middlewares/multer-config'

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
 * tags:
 *   name: Products
 *   description: Product management API
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: A successful response with a list of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   clickCount:
 *                     type: number
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       '200':
 *         description: A successful response with product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 clickCount:
 *                   type: number
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Product successfully created
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       '200':
 *         description: Product successfully deleted
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update product details
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Product successfully updated
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * /api/products/{id}/click:
 *   patch:
 *     summary: Update the click count of a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to update click count
 *     responses:
 *       '200':
 *         description: Click count successfully updated
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Server error
 */
