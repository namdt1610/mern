// api/authApi.ts
import axiosInstance from './axiosInstance'
import { authApi } from './apiConfig'

export const loginApi = async (credentials: {
    email: string
    password: string
}) => {
    const response = await axiosInstance.post(authApi.login, credentials)
    return response.data
}

export const registerApi = async (credenntials: {
    email: string
    password: string
}) => {
    const response = await axiosInstance.post(authApi.register, credenntials)
    return response.data
}

export const logoutApi = async () => {
    const response = await axiosInstance.post(authApi.logout)
    return response.data
}
