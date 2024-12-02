import axiosInstance from './axiosInstance'
import { categoryApi } from './apiConfig'
import { Category } from 'interfaces/Category'

export const fetchCategoriesApi = async (): Promise<Category[]> => {
    try {
        const response = await axiosInstance.get(categoryApi.base)
        return response.data
    } catch (error: any) {
        console.error(
            'Error fetching categories:',
            error.response?.data?.message || error.message
        )
        throw error
    }
}

export const fetchCategoryByIdApi = async (id: string): Promise<Category> => {
    if (!id) throw new Error('Invalid ID')
    try {
        const response = await axiosInstance.get(categoryApi.getById(id))
        return response.data
    } catch (error: any) {
        console.error(
            `Error fetching category with ID ${id}:`,
            error.response?.data?.message || error.message
        )
        throw error
    }
}

export const createCategoryApi = async (
    categoryData: Category
): Promise<Category> => {
    try {
        const response = await axiosInstance.post(
            categoryApi.base,
            categoryData
        )
        return response.data
    } catch (error: any) {
        console.error(
            'Error creating category:',
            error.response?.data?.message || error.message
        )
        throw error
    }
}

export const updateCategoryApi = async (
    id: string,
    updatedData: Partial<Category>
): Promise<Category> => {
    if (!id) throw new Error('Invalid ID')
    try {
        const response = await axiosInstance.put(
            categoryApi.getById(id),
            updatedData
        )
        return response.data
    } catch (error: any) {
        console.error(
            `Error updating category with ID ${id}:`,
            error.response?.data?.message || error.message
        )
        throw error
    }
}

export const deleteCategoryApi = async (id: string): Promise<void> => {
    if (!id) throw new Error('Invalid ID')
    try {
        await axiosInstance.delete(categoryApi.getById(id))
    } catch (error: any) {
        console.error(
            `Error deleting category with ID ${id}:`,
            error.response?.data?.message || error.message
        )
        throw error
    }
}
