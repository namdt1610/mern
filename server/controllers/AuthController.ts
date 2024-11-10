import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/UserModel' // Mô hình User

interface UserRequest extends Request {
    userId?: string
    headers: {
        authorization?: string
    }
}

// Đăng ký người dùng mới - POST /api/register
export const signup = async (req: Request, res: Response): Promise<void> => {
    const { email, username, password } = req.body

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({ email, username, password: hashedPassword })
        await newUser.save()

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        )
        res.status(201).json({ user: newUser, token })
    } catch (error) {
        res.status(500).json({ message: 'Could not register user' })
    }
}

// Đăng nhập người dùng - POST /api/login
export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ message: 'Invalid credentials' })
            return
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        )
        res.status(200).json({ user, token })
    } catch (error) {
        res.status(500).json({ message: 'Could not log in user' })
    }
}

// Logout - POST /api/auth/logout
export const logout = (req: Request, res: Response): void => {
    res.clearCookie('dangtrannam')
    res.status(200).json({ message: 'Logged out' })
}

// Xác thực token (middleware)
export const verifyToken = (
    req: UserRequest,
    res: Response,
    next: NextFunction
): void => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        res.status(401).json({ message: 'No token provided' })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: string
        }
        req.userId = decoded.id
        next()
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' })
    }
}

// Làm mới token - POST /api/auth/refresh
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
