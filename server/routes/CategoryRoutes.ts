import express from 'express'
import * as cc from '../controllers/CategoryController'

const router = express.Router()

// GET all categories
router.get('/', cc.getAllCategories)

// GET a Category by id
router.get('/:id', cc.getCategoryById)

// POST a Category
router.post('/', cc.createCategory)

// DELETE a Category by id
router.delete('/:id', cc.deleteCategory)

// UPDATE a Category by id
router.patch('/:id', cc.updateCategory)

export default router

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/categories/{id}:
 *   get:
 *     summary: Get category by id
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/categories/{id}:
 *   post:
 *     summary: Create category
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete category
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/categories/{id}:
 *   patch:
 *     summary: Update category
 *     responses:
 *       '200':
 *         description: A successful response
 */
