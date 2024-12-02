import {
    fetchCategoriesApi,
    fetchCategoryByIdApi,
    createCategoryApi,
    updateCategoryApi,
    deleteCategoryApi,
} from '../../services/categoryApi'
import useApiCall from '../useApiCall'
import { useCategoryContext } from './useCategoryContext'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

// hooks/Auth/useCategoryActions.ts

const useCategoryActions = () => {
    const { dispatch } = useCategoryContext()
    const navigate = useNavigate()

    const fetchCategories = useApiCall(
        fetchCategoriesApi,
        (data) => {
            dispatch({ type: 'SET_CATEGORIES', payload: data.categories })
        },
        (error) => {
            message.error(
                error?.response?.data?.message || 'Failed to fetch categories'
            )
        }
    )

    const fetchCategoryById = useApiCall(
        fetchCategoryByIdApi,
        (data) => {
            dispatch({ type: 'GET_CATEGORY', payload: data.category })
        },
        (error) => {
            message.error(
                error?.response?.data?.message || 'Failed to fetch category'
            )
        }
    )

    const createCategory = useApiCall(
        createCategoryApi,
        (data) => {
            message.loading('Creating category...', 0)
            dispatch({ type: 'CREATE_CATEGORY', payload: data.category })
            setTimeout(() => {
                message.destroy()
                message.success('Category created successfully', 1)
            }, 1000)
        },
        (error) => {
            message.error(
                error?.response?.data?.message || 'Category creation failed'
            )
        }
    )

    const updateCategory = useApiCall(
        updateCategoryApi,
        (data) => {
            message.loading('Updating category...', 0)
            dispatch({ type: 'UPDATE_CATEGORY', payload: data.category })
            setTimeout(() => {
                message.destroy()
                message.success('Category updated successfully', 1)
            }, 1000)
        },
        (error) => {
            message.error(
                error?.response?.data?.message || 'Category update failed'
            )
        }
    )

    const deleteCategory = useApiCall(
        deleteCategoryApi,
        (data) => {
            message.loading('Deleting category...', 0)
            dispatch({ type: 'DELETE_CATEGORY', payload: data.categoryId })
            setTimeout(() => {
                message.destroy()
                message.success('Category deleted successfully', 1)
            }, 1000)
        },
        (error) => {
            message.error(
                error?.response?.data?.message || 'Category deletion failed'
            )
        }
    )

    return {
        fetchCategories,
        fetchCategoryById,
        createCategory,
        updateCategory,
        deleteCategory,
    }
}

export default useCategoryActions
