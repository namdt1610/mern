import express from 'express'
import * as c from '../controllers/CartController'

const router = express.Router()

router.post('/:userId', c.addToCart)
router.get('/:userId', c.getCart)
router.put('/:userId/:productId', c.updateCartItem)
router.delete('/:userId/:productId', c.removeFromCart)

export default router

/**
 * @swagger
 * /api/cart/{userId}:
 *   get:
 *     summary: Get cart
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/cart/{userId}:
 *   post:
 *     summary: Add to cart
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/cart/{userId}/{productId}:
 *   put:
 *     summary: Update cart item
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/cart/{userId}/{productId}:
 *   delete:
 *     summary: Remove from cart
 *     responses:
 *       '200':
 *         description: A successful response
 *
 */
