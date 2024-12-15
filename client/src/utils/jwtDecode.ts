import {jwtDecode} from 'jwt-decode'

export interface DecodedToken {
    _id: string
    email: string
    role: string
    name: string
    avatar?: string
    status?: string
    createdAt?: string
    updatedAt?: string
}

export const decodeToken = (token: string): DecodedToken | null => {
    try {
        return jwtDecode<DecodedToken>(token)
    } catch (error) {
        console.error('Failed to decode token:', error)
        return null
    }
}
