import app from './server'
import connectDB from './config/dbConfig'
import dotenv from 'dotenv'

dotenv.config()
connectDB()
const port = process.env.PORT || 8888

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
