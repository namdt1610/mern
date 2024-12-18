import {Router} from 'express'
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
