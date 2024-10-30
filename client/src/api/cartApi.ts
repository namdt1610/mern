import axiosInstance from './axiosInstance'
import { cartApi } from './apiConfig'

export const fetchCartApi = async () => {
    try {
        const response = await axiosInstance.get(cartApi.base)
        return response.data
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error)
        throw error
    }
}

export const fetchcartByIdApi = async (id) => {
    if (!id) throw new Error('ID không hợp lệ')
    try {
        const response = await axiosInstance.get(cartApi.getById(id))
        return response.data
    } catch (error) {
        console.error(`Lỗi khi lấy sản phẩm với ID ${id}:`, error)
        throw error
    }
}

export const createcartApi = async (cartData) => {
    try {
        const response = await axiosInstance.post(cartApi.base, cartData)
        return response.data
    } catch (error) {
        console.error('Lỗi khi tạo sản phẩm mới:', error)
        throw error
    }
}

export const updatecartApi = async (id, updatedData) => {
    if (!id) throw new Error('ID không hợp lệ')
    try {
        const response = await axiosInstance.put(
            cartApi.getById(id),
            updatedData
        )
        return response.data
    } catch (error) {
        console.error(`Lỗi khi cập nhật sản phẩm với ID ${id}:`, error)
        throw error
    }
}

export const deletecartApi = async (id) => {
    if (!id) throw new Error('ID không hợp lệ')
    try {
        const response = await axiosInstance.delete(cartApi.getById(id))
        return response.data
    } catch (error) {
        console.error(`Lỗi khi xóa sản phẩm với ID ${id}:`, error)
        throw error
    }
}
