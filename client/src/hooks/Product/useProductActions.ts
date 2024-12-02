import { useContext } from 'react'
import { ProductContext } from '../../contexts/ProductContext'
import {
    fetchProductsApi,
    fetchProductByIdApi,
    deleteProductApi,
    createProductApi,
    updateProductApi,
} from '../../services/productApi'

const useProductActions = () => {
    const { dispatch } = useContext(ProductContext)

    type ActionType =
        | 'SET_PRODUCTS'
        | 'CREATE_PRODUCT'
        | 'GET_PRODUCT'
        | 'UPDATE_PRODUCT'
        | 'DELETE_PRODUCT'

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

    const fetchProducts = async () =>
        apiRequest(fetchProductsApi, 'SET_PRODUCTS')

    const fetchProductById = async (id: string) =>
        apiRequest(() => fetchProductByIdApi(id), 'GET_PRODUCT')

    const deleteProduct = async (id: string) =>
        apiRequest(() => deleteProductApi(id), 'DELETE_PRODUCT')

    const createProduct = async (productData: object) =>
        apiRequest(() => createProductApi(productData), 'CREATE_PRODUCT')

    const updateProduct = async (id: string, updatedData: FormData) =>
        apiRequest(() => updateProductApi(id, updatedData), 'UPDATE_PRODUCT')

    return {
        fetchProducts,
        fetchProductById,
        deleteProduct,
        createProduct,
        updateProduct,
    }
}

export default useProductActions
