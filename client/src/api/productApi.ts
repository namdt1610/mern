import axiosInstance from './axiosInstance'
import { productApi } from './apiConfig'

/**
 *TODO - Thêm state cho từng api
 */

export const searchProductsApi = async (searchTerm) => {
    if (!searchTerm) throw new Error('Từ khóa tìm kiếm không hợp lệ')
    try {
        const response = await axiosInstance.get(productApi.search(searchTerm))
        return response.data
    } catch (error) {
        console.error('Lỗi khi tìm kiếm sản phẩm:', error)
        throw error
    }
}

export const fetchProductsApi = async () => {
    try {
        const response = await axiosInstance.get(productApi.base)
        if (response.data.status === 'success') {
            return response.data.data // Lấy `data` chứa products và totalProducts
        } else {
            throw new Error(response.data.message) // Ném lỗi nếu status không phải success
        }
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
