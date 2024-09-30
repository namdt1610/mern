// productService.js
import axiosInstance from './axiosInstance'
import { productApi } from './apiConfig'

export const fetchProducts = async (dispatch) => {
    try {
        const response = await axiosInstance.get(`${productApi.base}`)
        dispatch({ type: 'SET_PRODUCTS', payload: response.data.products })
        return response.data
    } catch (error) {
        throw error
    }
}

export const fetchProductById = async (id, dispatch) => {
    try {
        const response = await axiosInstance.get(productApi.getById(id))
        dispatch({ type: 'GET_PRODUCT', payload: response.data })
        return response.data
    } catch (error) {
        throw error
    }
}

export const createProduct = async (productData, dispatch) => {
    try {
        const response = await axiosInstance.post(productApi.base, productData)
        dispatch({ type: 'CREATE_PRODUCT', payload: response.data })
        return response.data
    } catch (error) {
        throw error
    }
}

export const updateProduct = async (id, updatedData, dispatch) => {
    try {
        const response = await axiosInstance.put(
            productApi.getById(id),
            updatedData
        )
        dispatch({ type: 'UPDATE_PRODUCT', payload: response.data })
        return response.data
    } catch (error) {
        throw error
    }
}

export const deleteProduct = async (id, dispatch) => {
    try {
        const response = await axiosInstance.delete(productApi.getById(id))
        dispatch({ type: 'DELETE_PRODUCT', payload: id })
        return response.data
    } catch (error) {
        throw error
    }
}
