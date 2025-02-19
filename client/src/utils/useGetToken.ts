import Cookies from 'js-cookie'
import { DecodedToken, decodeToken } from './jwtDecode'

// Lấy thông tin người dùng từ cookie
export const getUserFromCookie = (): DecodedToken | null | undefined => {
    const token = Cookies.get('user')

    if (token) {
        try {
            return decodeToken(token) // Giải mã token và trả về thông tin người dùng
        } catch (e) {
            console.error('Error decoding token:', e)
            return null
        }
    }

    return null
}
