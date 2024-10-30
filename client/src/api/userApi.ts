// userApi.ts
import axiosInstance from './axiosInstance'
import { UserApi } from './apiConfig'

export const fetchUsersApi = async () => {
    try {
        const response = await axiosInstance.get(UserApi.base)
        return response.data
    } catch (error) {
        console.error('Lỗi khi lấy user:', error)
        throw error
    }
}

export const fetchUserByIdApi = async (id) => {
    if (!id) throw new Error('ID không hợp lệ')
    try {
        const response = await axiosInstance.get(UserApi.getById(id))
        return response.data
    } catch (error) {
        console.error(`Lỗi khi lấy user với ID ${id}:`, error)
        throw error
    }
}

export const createUserApi = async (UserData) => {
    try {
        const response = await axiosInstance.post(UserApi.base, UserData)
        return response.data
    } catch (error) {
        console.error('Lỗi khi tạo user mới:', error)
        throw error
    }
}

export const updateUserApi = async (id, updatedData) => {
    if (!id) throw new Error('ID không hợp lệ')
    try {
        const response = await axiosInstance.put(
            UserApi.getById(id),
            updatedData
        )
        return response.data
    } catch (error) {
        console.error(`Lỗi khi cập nhật user với ID ${id}:`, error)
        throw error
    }
}

export const deleteUserApi = async (id) => {
    if (!id) throw new Error('ID không hợp lệ')
    try {
        const response = await axiosInstance.delete(UserApi.getById(id))
        return response.data
    } catch (error) {
        console.error(`Lỗi khi xóa user với ID ${id}:`, error)
        throw error
    }
}
