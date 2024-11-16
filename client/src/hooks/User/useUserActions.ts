import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import {
    fetchUsersApi,
    fetchUserByIdApi,
    deleteUserApi,
    createUserApi,
    updateUserApi,
} from '../../api/userApi'

const useUserActions = () => {
    const { dispatch } = useContext(UserContext)

    type ActionType =
        | 'SET_USERS'
        | 'CREATE_USER'
        | 'GET_USER'
        | 'UPDATE_USER'
        | 'DELETE_USER'

    const apiRequest = async (
        apiFunc: Function,
        actionType: ActionType,
        payload?: any
    ) => {
        try {
            const data = await apiFunc(payload)
            dispatch({ type: actionType, payload: data })
            return data
        } catch (error) {
            console.error(`Error during ${actionType}:`, error)
            throw error // Optional: throw error if you want to handle it in the calling component
        }
    }

    const fetchUsers = async () => apiRequest(fetchUsersApi, 'SET_USERS')

    const fetchUserById = async (id: string) =>
        apiRequest(() => fetchUserByIdApi(id), 'GET_USER')

    const deleteUser = async (id: string) =>
        apiRequest(() => deleteUserApi(id), 'DELETE_USER')

    const createUser = async (userData: object) =>
        apiRequest(() => createUserApi(userData), 'CREATE_USER')

    const updateUser = async (id: string, updatedData: FormData) =>
        apiRequest(() => updateUserApi(id, updatedData), 'UPDATE_USER')

    return {
        fetchUsers,
        fetchUserById,
        deleteUser,
        createUser,
        updateUser,
    }
}

export default useUserActions
