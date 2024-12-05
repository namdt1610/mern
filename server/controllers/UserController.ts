import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/UserModel'

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
        return
    }
}

export const updateUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params
    const { email, password, name, role, status, phone, address } = req.body

    try {
        // Chuẩn bị dữ liệu cập nhật, bỏ qua những thuộc tính không thay đổi
        const updatedData: any = {
            email,
            name,
            role,
            status,
            phone,
            address,
            ...(req.file && { avatar: req.file.path }),
        }

        // Chỉ hash mật khẩu nếu có sự thay đổi
        if (password) {
            const updatedPassword = await bcrypt.hash(password, 12)
            updatedData.password = updatedPassword
        }

        // Cập nhật thông tin người dùng
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
            new: true,
        })

        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' })
            return
        }

        // Trả về thông tin người dùng đã cập nhật
        res.status(200).json(updatedUser.toJSON())
    } catch (error) {
        console.error('Error updating user:', error)
        res.status(500).json({ message: 'Could not update user' })
    }
}

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
