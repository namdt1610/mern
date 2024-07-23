const express = require('express')
const multer = require('multer')
const cors = require('cors')
const path = require('path')

const {
    createProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
    updateProduct,
} = require('../../controllers/admin/productController')

const app = express()
const router = express.Router()

app.use(cors())

app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
})

const upload = multer({ storage })

// GET all products
router.get('/', getAllProducts)

// GET a product by id
router.get('/:id', getProductById)

// POST a product
router.post('/', upload.single('imageUrl'), createProduct)

// DELETE a product by id
router.delete('/:id', deleteProduct)

// UPDATE a product by id
router.patch('/:id', upload.single('imageUrl'), updateProduct)

module.exports = router
