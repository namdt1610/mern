import axiosInstance from './axiosInstance'
import { authApi } from './apiConfig'

export const loginApi = async (loginData) => {
    try {
        const response = await axiosInstance.post(authApi.base, loginData)
        return response.data
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error)
        throw error
    }
}

export const registerApi = async (registerData) => {
      try {
            const response = await axiosInstance.post(authApi.base, registerData)
            return response.data
      } catch (error) {
            console.error('Lỗi khi đăng ký:', error)
            throw error
      }
      }