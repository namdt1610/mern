const multer = require('multer')
const path = require('path')

// Thiết lập lưu trữ hình ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/') // Thư mục lưu trữ trên máy chủ
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, `${Date.now()}${ext}`)
    },
})

const upload = multer({ storage })

module.exports = upload
