import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    useDeleteUserMutation,
    useGetUserByIdQuery,
    useUpdateUserMutation,
} from '@/services/UserApi'
import { Col, Empty, message, Row, Space } from 'antd'
import LoadingError from '@/components/shared/LoadingError'
import UserActions from './UserDetailsActions'
import UserAvatar from './UserDetailsAvatar'
import UserForm from './UserDetailsForm'
import { IUser } from '@/types/IUser'

const UserDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { data: user, isLoading, isError, refetch } = useGetUserByIdQuery(id!)
    const [updateUser] = useUpdateUserMutation()
    const [deleteUser] = useDeleteUserMutation()

    const [isEditing, setIsEditing] = useState(false)
    const [editedUser, setEditedUser] = useState<Partial<IUser>>({})
    const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
        user?.avatar
    )

    useEffect(() => {
        if (user) {
            setEditedUser(user)
            setAvatarPreview(
                user.avatar ? `http://localhost:8888/${user.avatar}` : ''
            )
        }
    }, [user])
    // Nhận URL avatar từ UserAvatar
    const handleAvatarChange = (avatarUrl: string) => {
        setEditedUser((prev) => ({
            ...prev,
            avatar: avatarUrl,
        }))
    }

    const handleSave = async () => {
        try {
            await updateUser({ id, ...editedUser }).unwrap()
            // console.log('After updating:', editedUser)
            setIsEditing(false)
            message.success('User updated successfully')
        } catch {
            message.error('Failed to update user')
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
                isError={null}
                refetch={refetch}
                title="User Detail"
                isLogin={false}
            />
        )
    if (isError || !user) return <Empty description="User not found" />

    return (
        <div className="py-4">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={10} lg={8}>
                        <UserActions
                            isEditing={isEditing}
                            onSave={handleSave}
                            onEditToggle={handleEditToggle}
                            onDelete={handleDelete}
                            onRefetch={refetch}
                        />
                        <div className="py-4">
                            <UserAvatar
                                onAvatarChange={handleAvatarChange}
                                avatar={
                                    avatarPreview ||
                                    `http://localhost:8888${user.avatar}`
                                }
                                isEditing={isEditing}
                            />
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={14} lg={16}>
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
                    </Col>
                </Row>
            </Space>
        </div>
    )
}

export default UserDetail
