import Cookies from 'js-cookie'
import { DecodedToken, decodeToken } from './jwtDecode'

// Lấy thông tin người dùng từ cookie
export const getUserFromCookie = (): DecodedToken | null => {
    const token = Cookies.get('user')
    if (token) {
        return decodeToken(token)
    }
    return null
}

// Lưu thông tin người dùng vào cookie
export const setUserCookie = (user: DecodedToken, token: string) => {
    Cookies.set('user', token, { expires: 7 }) // Đặt token vào cookie và kéo dài thời gian hết hạn
}

// Xóa cookie khi đăng xuất
export const removeUserCookie = () => {
    Cookies.remove('user')
}
