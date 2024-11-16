import axiosInstance from './axiosInstance'
import { categoryApi } from './apiConfig'

export const fetchCategoriesApi = async () => {
    try {
        const response = await axiosInstance.get(categoryApi.base)
        return response.data
    } catch (error) {
        console.error('Lỗi khi lấy danh mục:', error)
        throw error
    }
}

export const fetchCategoryByIdApi = async (id) => {
    if (!id) throw new Error('ID không hợp lệ')
    try {
        const response = await axiosInstance.get(categoryApi.getById(id))
        return response.data
    } catch (error) {
        console.error(`Lỗi khi lấy danh mục với ID ${id}:`, error)
        throw error
    }
}

export const createCategoryApi = async (categoryData) => {
    try {
        const response = await axiosInstance.post(
            categoryApi.base,
            categoryData
        )
        return response.data
    } catch (error) {
        console.error('Lỗi khi tạo danh mục mới:', error)
        throw error
    }
}

export const updateCategoryApi = async (id, updatedData) => {
    if (!id) throw new Error('ID không hợp lệ')
    try {
        const response = await axiosInstance.put(
            categoryApi.getById(id),
            updatedData
        )
        return response.data
    } catch (error) {
        console.error(`Lỗi khi cập nhật danh mục với ID ${id}:`, error)
        throw error
    }
}

export const deleteCategoryApi = async (id) => {
    if (!id) throw new Error('ID không hợp lệ')
    try {
        const response = await axiosInstance.delete(categoryApi.getById(id))
        return response.data
    } catch (error) {
        console.error(`Lỗi khi xóa danh mục với ID ${id}:`, error)
        throw error
    }
}
