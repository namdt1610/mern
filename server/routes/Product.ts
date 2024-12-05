import { Router } from 'express'
import {
    createProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
    updateProduct,
} from '../controllers/ProductController'

const router = Router()

router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.post('/', createProduct)
router.delete('/:id', deleteProduct)
router.patch('/:id', updateProduct)

export default router
