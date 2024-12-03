import express from 'express'
import path from 'path'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
//* server.ts

const app = express()

app.use(morgan('dev'))

app.use(cookieParser())

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}

// Apply middlewares in correct order
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Logging middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

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
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack)
    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
})

export default app