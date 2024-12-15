import {NextFunction, Request, Response} from 'express'

// Middleware kiểm tra quyền truy cập dựa trên role
export const checkRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.cookies['role'] // Lấy role từ cookie (giả sử cookie lưu role của người dùng)

        if (!userRole || !roles.includes(userRole)) {
            return res
                .status(403)
                .json({
                    message:
                        'Forbidden: You do not have permission to access this resource.',
                })
        }

        next()
    }
}
