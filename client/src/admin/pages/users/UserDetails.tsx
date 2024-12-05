import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useUploadAvatarMutation,
} from 'services/UserApi'
import { Card, Space, message, Empty, Form } from 'antd'
import LoadingError from 'components/LoadingError'
import UserActions from './UserDetailsActions'
import UserAvatar from './UserDetailsAvatar'
import UserForm from './UserDetailsForm'
import { User } from 'interfaces/User'

const UserDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const { data: user, isLoading, isError, refetch } = useGetUserByIdQuery(id)
    console.log('Current user:', user)
    const [updateUser] = useUpdateUserMutation()
    const [deleteUser] = useDeleteUserMutation()
    const [uploadAvatar] = useUploadAvatarMutation()

    const [isEditing, setIsEditing] = useState(false)
    const [editedUser, setEditedUser] = useState<Partial<User>>({})
    const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
        user?.avatar
    )

    const [avatarFile, setAvatarFile] = useState<File | null>(null)

    useEffect(() => {
        if (user) {
            setEditedUser(user)
            setAvatarPreview(
                user.avatar ? `http://localhost:8888/${user.avatar}` : ''
            )
        }
    }, [user])

    const handleSave = async () => {
        try {
            // Partial<User> có nghĩa là tất cả các thuộc tính trong User trở thành tùy chọn.
            // Đảm bảo _id có trong updatedData
            const updatedData: Partial<User> = { ...editedUser }
            console.log('upadteData:', updatedData)

            // Nếu có thay đổi avatar, thêm vào dữ liệu cập nhật
            if (avatarFile) {
                const formData = new FormData()
                formData.append('avatar', avatarFile)

                // Gọi API upload avatar
                const response = await uploadAvatar(formData).unwrap()
                updatedData.avatar = response.avatarUrl // Lấy URL từ response và gán vào updatedData
            } else {
                updatedData.avatar = user.avatar // Giữ avatar cũ nếu không thay đổi
            }

            // Gửi dữ liệu cập nhật tới API
            await updateUser({ id: id, ...updatedData }).unwrap()
            message.success('User updated successfully')
            setIsEditing(false)
        } catch (error: any) {
            console.error('Error updating user:', error)

            if (error?.data?.message) {
                message.error(`Error: ${error.data.message}`) // Hiển thị thông báo từ backend
            } else {
                message.error('Failed to update user. Please try again.')
            }
        }
    }

    const handleEditToggle = () => {
        setIsEditing((prev) => !prev)
    }

    const handleDelete = async () => {
        try {
            await deleteUser(id!).unwrap()
            message.success('User deleted successfully')
            navigate('/admin/users')
        } catch (error: any) {
            const errorMessage = error?.message || 'Failed to update user.'
            message.error(errorMessage)
        }
    }

    const handleAvatarChange = (file: File) => {
        if (avatarPreview) {
            URL.revokeObjectURL(avatarPreview) // Giải phóng URL cũ
        }
        const previewUrl = URL.createObjectURL(file)
        setAvatarPreview(previewUrl)
        setAvatarFile(file)
    }

    if (isLoading)
        return (
            <LoadingError
                isLoading={isLoading}
                error={null}
                refetch={refetch}
            />
        )
    if (isError || !user) return <Empty description="User not found" />

    return (
        <div>
            <Space direction="vertical" size="large">
                <div className="flex gap-4">
                    <Card>
                        <UserActions
                            isEditing={isEditing}
                            onSave={handleSave}
                            onEditToggle={handleEditToggle}
                            onDelete={handleDelete}
                            onRefetch={() => refetch}
                        />
                        <UserAvatar
                            avatar={
                                avatarPreview ||
                                `http://localhost:8888${user.avatar}`
                            }
                            onAvatarChange={handleAvatarChange}
                            isEditing={isEditing}
                        />
                    </Card>
                    <UserForm
                        user={user}
                        isEditing={isEditing}
                        editedUser={editedUser}
                        onInputChange={(field, value) =>
                            setEditedUser((prev) => ({
                                ...prev,
                                [field]: value,
                            }))
                        }
                        errors={{ email: '', phone: '' }}
                        validations={{ email: true, phone: true }}
                    />
                </div>
            </Space>
        </div>
    )
}

export default UserDetail
