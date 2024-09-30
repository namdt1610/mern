// axiosInstance.js
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: '/api/admin', // Base URL cho tất cả các request
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
})

// Thêm interceptor để xử lý lỗi (nếu cần)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Xử lý lỗi chung ở đây
        console.error('API Error:', error.response)
        return Promise.reject(error)
    }
)

export default axiosInstance
