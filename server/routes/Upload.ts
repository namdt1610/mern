// Upload.ts

import express, { Response, Request } from 'express'
import { upload } from '../middlewares/multerConfig' // Cấu hình multer
import path from 'path'

const router = express.Router()

// Route xử lý upload ảnh
router.post(
    '/upload-avatar',
    upload.single('avatar'),
    (req: Request, res: Response): void => {
        if (!req.file) {
             res.status(400).json({ message: 'No file uploaded' })
             return
        }
        // Tạo URL để trả về file đã tải lên
        const fileUrl = `/uploads/${req.file.filename}`
        res.status(200).json({ avatarUrl: fileUrl })
    }
)

export default router
