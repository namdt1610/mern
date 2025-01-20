import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/UserModel'

interface UserRequest extends Request {
    user?: {
        _id: string
        role: string
        name: string
    }
}

export const signup = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).json({
                status: false,
                message: 'User already exists',
            })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({ name, email, password: hashedPassword })
        await newUser.save()

        res.status(201).json({
            status: true,
            message: 'User registered successfully',
            user: {
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
            },
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Could not register user',
            error: (error as Error).message,
        })
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body

    console.log('Email:', email, '|| Password:', password)

    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ message: 'Your email is not existing' })
            return
        }

        // console.log('Password from request:', password)
        // console.log('Password from database (hashed):', user.password)

        const isMatch = bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid password' })
            return
        }
        console.log('User name before signing token:', user.name)

        const token = jwt.sign(
            { _id: user._id, role: user.role, name: user.name },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        )

        res.cookie('user', token, {
            maxAge: 1 * 60 * 60 * 1000, // 1 hour
            httpOnly: false, // Cho phép frontend đọc cookie
            secure: true, // Chỉ gửi cookie qua HTTPS
            sameSite: 'strict', // Ngăn chặn request từ các domain khác
            path: '/', // Cookie có hiệu lực trên toàn bộ website
        })
        console.log('Cookie:', res.getHeaders())
        console.log('Token:', token)

        res.status(200).json({ message: 'Login successful', token })
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error)
        res.status(500).json({
            message: 'Could not log in user',
            error: (error as Error).message,
        })
    }
}

export const logout = (req: Request, res: Response): void => {
    try {
        res.clearCookie('user')
        res.status(200).json({ status: false, message: 'User logged out' })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Could not log out user',
            error: (error as Error).message,
        })
    }
}

// Middleware xác thực token
export const verifyToken = (
    req: UserRequest,
    res: Response,
    next: NextFunction
): void => {
    const token = req.cookies.user
    console.log('Token:', token)

    if (!token) {
        res.status(401).json({ message: 'You have not logged in yet!' })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            _id: string
            role: string
            name: string
        }
        req.user = {
            _id: decoded._id,
            role: decoded.role,
            name: decoded.name,
        }
        next()
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' })
        return
    }
}

// Middleware phân quyền theo role
export const checkRole = (roles: string[]) => {
    return (req: UserRequest, res: Response, next: NextFunction): void => {
        console.log('User Role:', req.user?.role)
        const userRole = req.user?.role

        if (!userRole || !roles.includes(userRole)) {
            console.log('Forbidden, no permission')
            res.status(403).json({
                message:
                    'Forbidden: You do not have permission to access this resource.',
            })
            return
        }
        console.log('Role is valid, continuing...')
        next() // Nếu role hợp lệ, tiếp tục xử lý request
    }
}

// Refresh token
export const refreshToken = (req: Request, res: Response): void => {
    const oldToken = req.headers.authorization?.split(' ')[1]
    if (!oldToken) {
        res.status(403).json({ message: 'No token provided' })
        return
    }

    try {
        const decoded = jwt.verify(
            oldToken,
            process.env.JWT_SECRET as string
        ) as { id: string }
        const newToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        )
        res.status(200).json({ token: newToken })
    } catch (error) {
        res.status(403).json({ message: 'Failed to refresh token' })
    }
}
