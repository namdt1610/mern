import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'

export const useUserContext = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error(
            'useUsersContext must be used inside an UsersContextProvider'
        )
    }

    return context
}
