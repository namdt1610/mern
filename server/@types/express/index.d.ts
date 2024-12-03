// @types/express/index.d.ts
import { Request } from 'express'

// Mở rộng Request để thêm thuộc tính `user`
declare global {
    namespace Express {
        interface Request {
            user?: any // Hoặc có thể thay `any` bằng kiểu dữ liệu người dùng thực tế của bạn
        }
    }
}
