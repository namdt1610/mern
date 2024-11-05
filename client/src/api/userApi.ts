// userApi.ts
import axiosInstance from './axiosInstance'
import { userApi } from './apiConfig'
import { User } from '../interfaces/user.interface'

export const fetchUsersApi = async () => {
    try {
        const response = await axiosInstance.get(userApi.base)
        return response.data
    } catch (error) {
        console.error('Lỗi khi lấy user:', error)
        throw error
    }
}

export const fetchUserByIdApi = async (id: string) => {
    if (!id) throw new Error('ID không hợp lệ')
    try {
        const response = await axiosInstance.get(userApi.getById(id))
        return response.data
    } catch (error) {
        console.error(`Lỗi khi lấy user với ID ${id}:`, error)
        throw error
    }
}

export const createUserApi = async (userData) => {
    try {
        const response = await axiosInstance.post(userApi.base, userData)
        return response.data
    } catch (error) {
        console.error('Lỗi khi tạo user mới:', error)
        throw error
    }
}

export const updateUserApi = async (
    id: string,
    updatedData: FormData
): Promise<User> => {
    if (!id) throw new Error('ID không hợp lệ')
    try {
        const response = await axiosInstance.put(
            userApi.getById(id),
            updatedData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        return response.data
    } catch (error) {
        console.error(`Lỗi khi cập nhật user với ID ${id}:`, error)
        throw error
    }
}

export const deleteUserApi = async (id: string) => {
    if (!id) throw new Error('Invalid ID')
    try {
        console.log('id', id)
        const response = await axiosInstance.delete(userApi.getById(id))
        return response.data
    } catch (error) {
        console.error(`Lỗi khi xóa user với ID ${id}:`, error)
        throw error
    }
}
