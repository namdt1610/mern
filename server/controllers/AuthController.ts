import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/UserModel'

interface UserRequest extends Request {
    user?: {
        id: string
        role: string
    }
    userId?: string
    userRole?: string
    headers: {
        authorization?: string
    }
}

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

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body

    console.log('Email:', email, '|| Password:', password)

    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(401).json({ message: 'Invalid user' })
            return
        }

        console.log('Password from request:', password)
        console.log('Password from database (hashed):', user.password)

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid password' })
            return
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        )

        res.cookie('user', token, {
            maxAge: 1 * 60 * 60 * 1000,
            httpOnly: false,
            secure: true,
            sameSite: 'strict',
            path: '/',
        })
        console.log('Cookie:', res.getHeaders())
        console.log('Token:', token)

        res.status(200).json({ message: 'Login successful', token })
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error)
        res.status(500).json({ message: 'Could not log in user' })
    }
}

export const logout = (req: Request, res: Response): void => {
    res.clearCookie('user')
    res.status(200).json({ message: 'Logged out' })
}

export const verifyToken = (
    req: UserRequest,
    res: Response,
    next: NextFunction
): void => {
    const token = req.cookies.user
    console.log('Token:', token)

    if (!token) {
        res.status(401).json({ message: 'No token provided' })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: string
            role: string
        }
        req.user = {
            id: decoded.id,
            role: decoded.role,
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
