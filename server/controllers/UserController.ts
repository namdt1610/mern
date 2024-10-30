import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/UserModel'

// Lấy danh sách người dùng - GET /api/users
export const getAllUsers = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: 'Could not fetch users' })
    }
}

// Lấy người dùng theo ID - GET /api/users/:id
export const getUserById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params

    try {
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({ message: 'User not found' })
            return
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: 'Could not fetch user' })
    }
}

// Cập nhật thông tin người dùng - PUT /api/users/:id
export const updateUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params
    const { email, password } = req.body

    try {
        const hashedPassword = password
            ? await bcrypt.hash(password, 12)
            : undefined
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { email, ...(hashedPassword && { password: hashedPassword }) },
            { new: true }
        )

        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' })
            return
        }
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ message: 'Could not update user' })
    }
}

// Xóa người dùng - DELETE /api/users/:id
export const deleteUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params

    try {
        const deletedUser = await User.findByIdAndDelete(id)
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' })
            return
        }
        res.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Could not delete user' })
    }
}
