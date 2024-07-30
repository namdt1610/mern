const express = require('express')
const path = require('path')
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Import routes
const userRoutes = require('./routes/client/user')
const productRoutes = require('./routes/admin/Product')
const categoryRoutes = require('./routes/admin/category')

// Use routes
app.use('/api/users', userRoutes)
app.use('/api/admin/products', productRoutes)
app.use('/api/admin/categories', categoryRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

module.exports = app
