// utils/cache.js
/**
 *TODO - Viết cache để khi có sự thay đổi từ server thi mới render lại
 */

// Hàm lưu trữ dữ liệu vào Local Storage với thời gian hết hạn
export const setCache = (key, data, expiryTimeInMillis) => {
    const expiryTime = Date.now() + expiryTimeInMillis // Tính thời gian hết hạn
    const cacheData = {
        data,
        expiry: expiryTime,
    }
    localStorage.setItem(key, JSON.stringify(cacheData)) // Lưu dữ liệu và thời gian hết hạn vào Local Storage
}

// Hàm lấy dữ liệu từ cache (nếu còn hiệu lực)
export const getCache = (key) => {
    const cachedItem = localStorage.getItem(key)

    if (!cachedItem) return null // Không có dữ liệu trong Local Storage

    const cacheData = JSON.parse(cachedItem)
    const currentTime = Date.now()

    // Kiểm tra nếu dữ liệu hết hạn, xóa cache và trả về null
    if (cacheData.expiry && cacheData.expiry < currentTime) {
        localStorage.removeItem(key) // Xóa dữ liệu hết hạn
        return null
    }

    return cacheData.data // Trả về dữ liệu nếu còn hiệu lực
}

// Hàm xóa cache theo key
export const clearCache = (key) => {
    localStorage.removeItem(key)
}

// Hàm xóa toàn bộ cache
export const clearAllCache = () => {
    localStorage.clear()
}
