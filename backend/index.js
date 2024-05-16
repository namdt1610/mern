const express = require('express')
const app = express()
const port = 8888

app.get('/api/data', (req, res) => {
    // Handle your API logic here
    const data = { message: 'Hello from the server!' }
    res.json(data)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
