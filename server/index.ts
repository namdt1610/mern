import app from './server'
import connectDB from './config/dbConfig'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
connectDB()
const port = process.env.PORT || 8888

app.use(
    cors({
        origin: 'http://localhost:5173', // Cho phép yêu cầu từ frontend (ví dụ: React đang chạy trên localhost:3000)
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức HTTP được phép
        credentials: true, // Cho phép gửi cookie (cần thiết nếu bạn dùng cookie JWT)
    })
)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
