import Cookies from 'js-cookie'
import { DecodedToken, decodeToken } from './jwtDecode'
import { useDispatch } from 'react-redux'
import { setUserId } from '../redux/userSlice'

//* utils/auth.ts

// Lấy userId từ cookie rồi dispatch vào store
export const useGetUserIdFromCookie = () => {
    const dispatch = useDispatch()
    const token = Cookies.get('user')
    if (token) {
        try {
            const user = decodeToken(token)
            dispatch(setUserId(user!._id))
            localStorage.setItem('userId', user!._id)
            return user!._id
        } catch (e) {
            console.error('Error decoding token:', e)
            return null
        }
    }
    return localStorage.getItem('userId')
}

// Lấy thông tin người dùng từ cookie
export const getUserFromCookie = (): DecodedToken | null => {
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

// Lấy role người dùng từ cookie
export const getUserRoleFromCookie = (): string | null => {
    const user = getUserFromCookie()
    if (user) {
        return user.role
    }
    return null
}
