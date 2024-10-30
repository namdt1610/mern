// hooks/useUserActions.ts
import { useContext } from 'react'
import {
    fetchUsersApi,
    fetchUserByIdApi,
    deleteUserApi,
    createUserApi,
    updateUserApi,
} from '../api/userApi'
import { UserContext } from '../context/UserContext' // Đảm bảo bạn có UserContext quản lý state

const useUserActions = () => {
    const { dispatch } = useContext(UserContext)

    // Hàm lấy danh sách người dùng
    const fetchUsers = async () => {
        try {
            const data = await fetchUsersApi()
            dispatch({ type: 'SET_USERS', payload: data.Users })
            return data.Users
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }

    // Hàm lấy người dùng theo ID
    const fetchUserById = async (id: string) => {
        try {
            const data = await fetchUserByIdApi(id)
            dispatch({ type: 'GET_USER', payload: data })
        } catch (error) {
            console.error('Error fetching user by ID:', error)
        }
    }

    // Hàm xóa người dùng
    const deleteUser = async (id: string) => {
        try {
            const data = await deleteUserApi(id)
            dispatch({ type: 'DELETE_USER', payload: id })
            return data
        } catch (error) {
            console.error('Error deleting user:', error)
        }
    }

    // Hàm tạo người dùng mới
    const createUser = async (userData: object) => {
        try {
            const data = await createUserApi(userData)
            dispatch({ type: 'CREATE_USER', payload: data })
        } catch (error) {
            console.error('Error creating user:', error)
        }
    }

    // Hàm cập nhật người dùng
    const updateUser = async (id: string, updatedData: object) => {
        try {
            const data = await updateUserApi(id, updatedData)
            dispatch({ type: 'UPDATE_USER', payload: data })
        } catch (error) {
            console.error('Error updating user:', error)
        }
    }

    // Trả về các hàm hành động
    return {
        fetchUsers,
        fetchUserById,
        deleteUser,
        createUser,
        updateUser,
    }
}

export default useUserActions
