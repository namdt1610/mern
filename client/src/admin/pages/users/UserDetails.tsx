// UserDetail.tsx

import React, { useEffect, useState } from 'react'
import useUserActions from '../../../hooks/User/useUserActions'
import { useParams } from 'react-router-dom'
import { User } from '../../../interfaces/User'
import UserAvatar from './UserDetailsAvatar'
import UserActions from './UserDetailsActions'
import UserForm from './UserDetailsForm'
import * as formatUtils from '../../utils/format.utils'
import { Card, message, Spin, Space } from 'antd/lib'

const UserDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const { fetchUserById, updateUser, deleteUser } = useUserActions()
    const [user, setUser] = useState<User | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editedUser, setEditedUser] = useState<Partial<User> | null>(null)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const [errors, setErrors] = useState({ email: '', phone: '' })
    const [validations, setValidations] = useState({ email: true, phone: true })

    useEffect(() => {
        const getUser = async () => {
            const fetchedUser = await fetchUserById(id)
            setUser(fetchedUser)
            setEditedUser(fetchedUser)
            setAvatarPreview(`http://localhost:8888/${fetchedUser.avatar}`)
        }
        getUser()
    }, [id])

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        const previewUrl = URL.createObjectURL(file)
        setAvatarPreview(previewUrl)
    }

    const validateFields = () => {
        const newValidations = {
            email: formatUtils.isValidEmail(editedUser?.email || ''),
            phone: formatUtils.isValidPhoneNumber(editedUser?.phone || ''),
        }
        setValidations(newValidations)
        return Object.values(newValidations).every((value) => value === true)
    }

    const handleSave = async () => {
        const newErrors = { email: '', phone: '' }

        if (!formatUtils.isValidEmail(editedUser?.email || '')) {
            message.warning('Check your email format')
            newErrors.email =
                'Invalid email format (example: yourname@email.com)'
        }

        if (!formatUtils.isValidPhoneNumber(editedUser?.phone || '')) {
            message.warning('Check your phone number format')
            newErrors.phone = 'Invalid phone number format'
        }

        if (newErrors.email || newErrors.phone) {
            setErrors(newErrors)
            return
        }

        try {
            if (!validateFields()) {
                message.warning('Please check your input fields')
                return
            }

            const formData = new FormData()
            for (const key in editedUser) {
                formData.append(key, editedUser[key])
            }

            if (avatarPreview) {
                const fileInput = document.querySelector('input[type="file"]')
                if ((fileInput as HTMLInputElement)?.files[0]) {
                    formData.append(
                        'avatar',
                        (fileInput as HTMLInputElement).files[0]
                    )
                }
            }

            formData.forEach((value, key) => {
                console.log(key + ': ' + value)
            })

            const loadingMessage = message.loading('Saving...', 0) // Thời gian không giới hạn

            setTimeout(async () => {
                try {
                    const updatedUser = await updateUser(id, formData)
                    setUser(updatedUser)
                    setIsEditing(false)
                    loadingMessage() // Đóng thông báo loading
                    message.success('User updated successfully')
                } catch (error) {
                    console.error('Error during save:', error)
                    loadingMessage() // Đóng thông báo loading
                    message.error('Error occurred while saving')
                }
            }, 1000)
        } catch (error) {
            console.error('Error during save:', error)
        }
    }

    const handleEditToggle = () => {
        setIsEditing(!isEditing)
    }

    const handleDelete = async () => {
        try {
            await deleteUser(id)
            message.success('User deleted successfully')
            console.log('User deleted successfully')
            window.location.href = '/admin/users'
        } catch (error) {
            console.error('Error during delete:', error)
        }
    }

    if (!user) {
        return <Spin size="large" fullscreen />
    }

    return (
        <div>
            <Space
                className="flex items-center justify-center"
                direction="vertical"
                size="large"
            >
                <UserActions
                    isEditing={isEditing}
                    onSave={handleSave}
                    onEditToggle={handleEditToggle}
                    onDelete={handleDelete}
                />

                <UserAvatar
                    avatar={
                        avatarPreview || `http://localhost:8888/${user.avatar}`
                    }
                    onDrop={onDrop}
                    isEditing={isEditing}
                />
                <UserForm
                    user={user}
                    isEditing={isEditing}
                    editedUser={editedUser || {}}
                    onInputChange={(field, value) =>
                        setEditedUser((prev) => ({
                            ...prev,
                            [field]: value,
                        }))
                    }
                    errors={errors}
                    validations={validations}
                />
            </Space>
        </div>
    )
}

export default UserDetail
