import axiosInstance from './axiosInstance'
import { productApi } from './apiConfig'

export const fetchProductsApi = async () => {
    try {
        const response = await axiosInstance.get(productApi.base)
        return response.data
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error)
        throw error
    }
}

export const fetchProductByIdApi = async (id) => {
    if (!id) throw new Error('ID không hợp lệ')
    try {
        const response = await axiosInstance.get(productApi.getById(id))
        return response.data
    } catch (error) {
        console.error(`Lỗi khi lấy sản phẩm với ID ${id}:`, error)
        throw error
    }
}

export const createProductApi = async (productData) => {
    try {
        const response = await axiosInstance.post(productApi.base, productData)
        return response.data
    } catch (error) {
        console.error('Lỗi khi tạo sản phẩm mới:', error)
        throw error
    }
}

export const updateProductApi = async (id, updatedData) => {
    if (!id) throw new Error('ID không hợp lệ')
    try {
        const response = await axiosInstance.put(
            productApi.getById(id),
            updatedData
        )
        return response.data
    } catch (error) {
        console.error(`Lỗi khi cập nhật sản phẩm với ID ${id}:`, error)
        throw error
    }
}

export const deleteProductApi = async (id) => {
    if (!id) throw new Error('ID không hợp lệ')
    try {
        const response = await axiosInstance.delete(productApi.getById(id))
        return response.data
    } catch (error) {
        console.error(`Lỗi khi xóa sản phẩm với ID ${id}:`, error)
        throw error
    }
}
