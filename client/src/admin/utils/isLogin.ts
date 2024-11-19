import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'

export const isLogin = () => {
    const { state } = useContext(AuthContext)
    return state.user !== null
}
