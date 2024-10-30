import express from 'express'
import path from 'path'

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

import authRoutes from './routes/Auth'
import userRoutes from './routes/User'
import categoryRoutes from './routes/Category'
import productRoutes from './routes/Product'

app.use('/api', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)

app.use(
    (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        console.error(err.stack)
        res.status(500).send('Something broke!')
    }
)

export default app
