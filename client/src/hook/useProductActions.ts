// hooks/useProductActions.ts
import {
    fetchProductsApi,
    fetchProductByIdApi,
    deleteProductApi,
    createProductApi,
    updateProductApi,
} from '../api/productApi'
import { setCache, getCache } from '../utils/cache'

const cacheKey = 'products' // Đặt key cho cache
const cacheDuration = 60 * 60 * 1000 // 1 giờ

// Hàm lấy danh sách sản phẩm và dispatch vào state
export const fetchProducts = async (dispatch) => {
    const cachedProducts = getCache(cacheKey) // Kiểm tra cache
    if (cachedProducts) {
        dispatch({ type: 'SET_PRODUCTS', payload: cachedProducts }) // Cập nhật state từ cache
        return // Nếu có cache, không cần gọi API
    }
    try {
        const data = await fetchProductsApi() // Gọi API
        //   console.log(data)
        dispatch({ type: 'SET_PRODUCTS', payload: data.products }) // Cập nhật state
    } catch (error) {
        console.error(error)
    }
}

// Hàm lấy sản phẩm theo ID và dispatch vào state
export const fetchProductById = async (id, dispatch) => {
    try {
        const data = await fetchProductByIdApi(id) // Gọi API
        dispatch({ type: 'GET_PRODUCT', payload: data }) // Cập nhật state
    } catch (error) {
        console.error(error)
    }
}

// Hàm xóa sản phẩm và dispatch vào state
export const deleteProduct = async (id, dispatch) => {
    try {
        const data = await deleteProductApi(id) // Gọi API
        dispatch({ type: 'DELETE_PRODUCT', payload: id }) // Cập nhật state
        return data
    } catch (error) {
        console.error(error)
    }
}

// Hàm tạo sản phẩm mới và dispatch vào state
export const createProduct = async (productData, dispatch) => {
    try {
        const data = await createProductApi(productData) // Gọi API
        dispatch({ type: 'CREATE_PRODUCT', payload: data }) // Cập nhật state
    } catch (error) {
        console.error(error)
    }
}

// Hàm cập nhật sản phẩm và dispatch vào state
export const updateProduct = async (id, updatedData, dispatch) => {
    try {
        const data = await updateProductApi(id, updatedData) // Gọi API
        dispatch({ type: 'UPDATE_PRODUCT', payload: data }) // Cập nhật state
    } catch (error) {
        console.error(error)
    }
}
