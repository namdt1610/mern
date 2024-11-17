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
            console.log('Không tìm thấy người dùng')
            res.status(401).json({ message: 'Invalid credentials' })
            return
        }

        console.log('Password from request:', password)
        console.log('Password from database (hashed):', user.password)

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            console.log('Mật khẩu không đúng')
            res.status(401).json({ message: 'Invalid credentials' })
            return
        }

        console.log('Đăng nhập thành công')

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        )

        res.cookie('user', token, {
            maxAge: 24 * 60 * 60 * 1000,
        })

        res.status(200).json({ user, token })
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
    const token = req.headers.authorization?.split(' ')[1]
    console.log('Token:', token)

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
