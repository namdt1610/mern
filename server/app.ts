//* server.ts
import express, { Request, Response } from 'express'
import path from 'path'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import fs from 'fs'
import upload from './middlewares/multer-config'
import sharp from 'sharp'

// Routes
import authRoutes from './routes/AuthRoutes'
import userRoutes from './routes/UserRoutes'
import categoryRoutes from './routes/CategoryRoutes'
import productRoutes from './routes/ProductRoutes.'
import inventoryRoutes from './routes/InventoryRoutes'
import orderRoutes from './routes/OrderRoutes'
import cartRoutes from './routes/CartRoutes'
import dashboardRoutes from './routes/DashboardRoutes'
import reviewRoutes from './routes/ReviewRoutes'
const app = express()

// Middleware để parse JSON và URL-encoded body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Morgan for logging requests
app.use(morgan('dev'))

// Cookie parser middleware
app.use(cookieParser())

// CORS options
const corsOptions = {
    origin: ['http://localhost:5173', 'https://mern-psi-nine.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    optionsSuccessStatus: 200,
}

// CORS middleware
app.use(cors(corsOptions))

// Serve static files for uploaded images
const uploadsPath = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true }) // Ensure uploads folder exists
}
app.use('/uploads', express.static(uploadsPath))

// Logging middleware with time and user-agent
app.use((req, res, next) => {
    console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.path} - User-Agent: ${req.get('User-Agent')}`
    )
    next()
})

// Route để tải lên ảnh
// app.post(
//     '/api/upload',
//     upload.single('avatar'),
//     (req: Request, res: Response): void => {
//         if (!req.file) {
//             res.status(400).json({ message: 'No file uploaded' })
//             return
//         }
//         const avatarUrl = `/uploads/${req.file.filename}` // Tạo URL từ filename
//         res.json({
//             message: 'File uploaded successfully!',
//             file: {
//                 avatarUrl, // Trả về avatarUrl
//             },
//         })
//     }
// )

app.post(
    '/api/upload',
    upload.single('avatar'),
    (req: Request, res: Response): void => {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' })
            return
        }

        const filePath = path.join(__dirname, 'uploads', req.file.filename) // Đảm bảo tạo đường dẫn tuyệt đối
        const webpFilePath = filePath.replace(path.extname(filePath), '.webp') // Đổi đuôi thành .webp

        // Sử dụng sharp để chuyển đổi ảnh sang WebP
        sharp(filePath)
            .webp({ quality: 80 })
            .toFile(webpFilePath, (err, info) => {
                if (err) {
                    console.error('Error during image conversion:', err)
                    return res.status(500).json({
                        message: 'Error converting image',
                        error: err.message, // Thêm chi tiết lỗi
                    })
                }

                // Nếu thành công, xóa ảnh gốc
                fs.unlink(filePath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error(
                            'Error deleting original image:',
                            unlinkErr
                        )
                        return res.status(500).json({
                            message: 'Failed to delete original image',
                            error: unlinkErr.message, // Thêm chi tiết lỗi
                        })
                    }

                    // Trả về URL của ảnh WebP
                    const avatarUrl = `/uploads/${path.basename(webpFilePath)}`
                    res.json({
                        message: 'File uploaded and converted successfully!',
                        file: { avatarUrl },
                    })
                })
            })
    }
)

app.use('/api', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/inventory', inventoryRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/reviews', reviewRoutes)

// Global error handler
app.use(
    (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        console.error('Error stack:', err.stack)
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: err.message || 'Unknown error', // Return more error details in response
        })
    }
)

export default app
