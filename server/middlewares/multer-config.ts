import multer from 'multer'
import { Request, Response } from 'express'

const storage = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
    ) => {
        cb(null, 'uploads/') // Đường dẫn đến thư mục lưu trữ
    },
    filename: (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, filename: string) => void
    ) => {
        // Tạo tên tệp duy nhất bằng cách thêm timestamp vào tên gốc
        cb(null, `${Date.now()}-${file.originalname}`)
    },
})

const upload = multer({ storage })

export { upload }
