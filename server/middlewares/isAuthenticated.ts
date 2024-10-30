// Backend: middleware/isAuthenticated.ts
import jwt from 'jsonwebtoken'

// req: Request, res: Response, next: NextFunction
const isAuthenticated = (req, res, next) => {
    // Lấy token từ header của request gửi lên từ client (nếu có) và kiểm tra
    const token = req.headers.authorization?.split(' ')[1]
    // 401: Unauthorized
    if (!token) return res.status(401).json({ message: 'Unauthorized' })
    jwt.verify(token, 'tran-hung-dao', (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' })
        // decoded chính là payload đã được mã hóa bên phía client
        req.user = decoded
        next()
    })
}
