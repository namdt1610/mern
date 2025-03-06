import { IUser } from '@/types/IUser'
import { jwtDecode } from 'jwt-decode'

export interface DecodedToken extends IUser {
    exp: number
}

export const decodeToken = (token: string): DecodedToken | null => {
    try {
        return jwtDecode<DecodedToken>(token)
    } catch (error) {
        console.error('Failed to decode token:', error)
        return null
    }
}
