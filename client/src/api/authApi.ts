// api/authApi.ts
import axiosInstance from './axiosInstance'
import { authApi } from './apiConfig'

export const loginApi = async (credentials: {
    email: string
    password: string
}) => {
    try {
        console.log('Credentials:', credentials)
        const response = await axiosInstance.post(authApi.login, credentials)
        console.log('Data from API login:', response.data)
        return response.data
    } catch (error) {
        console.error('Error when logging in:', error)
        throw error
    }
}

export const registerApi = async (credenntials: {
    email: string
    password: string
}) => {
    try {
        const response = await axiosInstance.post(
            authApi.register,
            credenntials
        )
        console.log('Data from API register:', response.data)
        return response.data
    } catch (error) {
        console.error('Error when registering:', error)
        throw error
    }
}

export const logoutApi = async () => {
    try {
        const response = await axiosInstance.post(authApi.logout)
        console.log('Data from API logout:', response.data)
        return response.data
    } catch (error) {
        console.error('Error when logging out:', error)
        throw error
    }
}
