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
    // console.log('Current user:', user)
    const [updateUser] = useUpdateUserMutation()
    const [deleteUser] = useDeleteUserMutation()
    const [uploadAvatarToServer] = useUploadAvatarMutation()

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
    // Lưu avatar mới
    const handleAvatarChange = (file: File) => {
        setAvatarFile(file)
    }
    const handleSave = async () => {
        try {
            const updatedData: Partial<User> = { ...editedUser }

            // Kiểm tra nếu có thay đổi avatar (người dùng đã chọn ảnh mới)
            if (avatarFile) {
                const formData = new FormData()
                formData.append('avatar', avatarFile) // Thêm file ảnh vào formData

                // Hiển thị thông báo đang tải ảnh lên
                message.loading({
                    content: 'Uploading avatar...',
                    key: 'avatarUpload',
                })

                // Gọi API upload ảnh, nhận lại URL của ảnh mới
                const response = await uploadAvatarToServer(formData).unwrap()

                // Lấy URL ảnh từ phản hồi của API và cập nhật vào dữ liệu người dùng
                updatedData.avatar = response.avatarUrl // URL của ảnh mới

                // Thông báo upload thành công
                message.success({
                    content: 'Avatar uploaded!',
                    key: 'avatarUpload',
                })
            } else {
                updatedData.avatar = user.avatar // Nếu không có ảnh mới, giữ lại ảnh cũ
            }

            // Cập nhật thông tin người dùng (bao gồm cả avatar nếu có thay đổi)
            await updateUser({ id: id, ...updatedData }).unwrap()

            // Thông báo cập nhật thành công
            message.success('User updated successfully')
            setIsEditing(false) // Tắt chế độ chỉnh sửa
        } catch (error: any) {
            console.error('Error updating user:', error)
            message.error('Failed to update user. Please try again.')
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
                            onAvatarChange={handleAvatarChange}
                            avatar={
                                avatarPreview ||
                                `http://localhost:8888${user.avatar}`
                            }
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
