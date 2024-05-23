const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Import routes
const apiRoutes = require('./routes/apiRoutes')
const adminRoutes = require('./routes/AdminRoutes')
const authRoutes = require('./routes/AuthRoutes')

// Use routes
app.use('/api', apiRoutes)
app.use('/admin', adminRoutes)
app.use('/auth', authRoutes)

app.get('/api/data', (req, res) => {
    // Handle your API logic here
    const data = { message: 'Hello from the server!' }
    res.json(data)
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

module.exports = app
