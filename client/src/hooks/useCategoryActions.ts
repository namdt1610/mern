import { useContext } from 'react'
import { CategoryContext } from '../contexts/CategoryContext'
import {
    fetchCategoriesApi,
    fetchCategoryByIdApi,
    deleteCategoryApi,
    createCategoryApi,
    updateCategoryApi,
} from '../api/categoryApi'

const useCategoryActions = () => {
    const { dispatch } = useContext(CategoryContext)

    type ActionType =
        | 'SET_CATEGORIES'
        | 'CREATE_CATEGORY'
        | 'GET_CATEGORY'
        | 'UPDATE_CATEGORY'
        | 'DELETE_CATEGORY'

    const apiRequest = async (
        apiFunc: Function,
        actionType: ActionType,
        payload?: any
    ) => {
        try {
            const data = await apiFunc(payload)
            dispatch({ type: actionType, payload: data })
            return data
        } catch (error) {
            console.error(`Error during ${actionType}:`, error)
            throw error // Optional: throw error if you want to handle it in the calling component
        }
    }

    const fetchCategories = async () =>
        apiRequest(fetchCategoriesApi, 'SET_CATEGORIES')

    const fetchCategoryById = async (id: string) =>
        apiRequest(() => fetchCategoryByIdApi(id), 'GET_CATEGORY')

    const deleteCategory = async (id: string) =>
        apiRequest(() => deleteCategoryApi(id), 'DELETE_CATEGORY')

    const createCategory = async (categoryData: object) =>
        apiRequest(() => createCategoryApi(categoryData), 'CREATE_CATEGORY')

    const updateCategory = async (id: string, name: string) =>
        apiRequest(() => updateCategoryApi(id, name), 'UPDATE_CATEGORY')

    return {
        fetchCategories,
        fetchCategoryById,
        deleteCategory,
        createCategory,
        updateCategory,
    }
}

export default useCategoryActions
