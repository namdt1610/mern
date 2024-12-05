import { Router } from 'express'
import { upload } from '../middlewares/multer-config'
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
router.post('/', upload.single('imageUrl'), createProduct)
router.delete('/:id', deleteProduct)
router.patch('/:id', upload.single('imageUrl'), updateProduct)

export default router
