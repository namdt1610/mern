// src/config/multerConfig.ts

import multer, {StorageEngine} from 'multer'
import path from 'path'
import fs from 'fs'

// Cấu hình lưu trữ tệp
const storage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads'
        // Tạo thư mục uploads nếu chưa tồn tại
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir)
        }
        cb(null, uploadDir) // Chỉ định thư mục lưu tệp
    },
    filename: (req, file, cb) => {
        // Tạo tên tệp duy nhất để tránh trùng lặp
        cb(null, Date.now() + path.extname(file.originalname))
    },
})

// Cấu hình Multer với giới hạn kích thước tệp là 2MB
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Giới hạn 2MB
})

export default upload
