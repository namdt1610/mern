import express from 'express'
import * as c from '../controllers/CartController'

const router = express.Router()

router.post('/:userId', c.addToCart)
router.get('/:userId', c.getCart)
router.put('/:userId/:productId', c.updateCartItem)
router.delete('/:userId/:productId', c.removeFromCart)

export default router
