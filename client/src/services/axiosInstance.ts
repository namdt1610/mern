// axiosInstance.js
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: '/api', // Base URL cho tất cả các request
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
    withCredentials: true, // Gửi cookie cùng với mọi request
})

export default axiosInstance
