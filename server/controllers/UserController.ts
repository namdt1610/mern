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
    const { email, password, name, role, status, phone, address, avatar } =
        req.body

    try {
        // Hash password nếu có trong body
        const hashedPassword = password
            ? await bcrypt.hash(password, 12)
            : undefined

        // Chuẩn bị dữ liệu cập nhật
        const updatedData = {
            email,
            name,
            role,
            status,
            phone,
            address,
            avatar,
            ...(hashedPassword && { password: hashedPassword }),
            ...(req.file && { avatar: req.file.path }),
        }

        // Cập nhật thông tin người dùng
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
            new: true,
        })

        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' })
            return
        }

        res.status(200).json(updatedUser.toJSON()) // Trả về user đã cập nhật
    } catch (error) {
        console.error('Error updating user:', error)
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
