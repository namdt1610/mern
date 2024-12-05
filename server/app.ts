import express, { Request, Response } from 'express'
import path from 'path'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import fs from 'fs'
import upload from './middlewares/multer-config'

//* server.ts

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
    origin: 'http://localhost:5173',
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
app.post(
    '/api/upload',
    upload.single('avatar'),
    (req: Request, res: Response): void => {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded.' })
        }

        // Trả về thông tin tệp đã tải lên
        res.json({
            message: 'File uploaded successfully!',
            file: req.file, // Thông tin tệp đã tải lên
        })
    }
)

// Routes
import authRoutes from './routes/Auth'
import userRoutes from './routes/User'
import categoryRoutes from './routes/Category'
import productRoutes from './routes/Product'

app.use('/api', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)

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
