import { Request, Response, Router } from 'express'
import { upload } from '../middlewares/multer-config' // Đảm bảo bạn đã import multer configuration

const router = Router()

// API upload avatar
router.post(
    '/api/upload-avatar',
    upload.single('avatar'),
    (req: Request, res: Response): void => {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' })
            return
        }

        // Tiến hành xử lý file, ví dụ lưu đường dẫn vào cơ sở dữ liệu
        const filePath = req.file.path
        res.status(200).json({
            message: 'File uploaded successfully',
            filePath,
        })
    }
)

export default router
