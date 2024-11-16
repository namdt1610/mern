// userDetail/index.tsx

import React, { useEffect, useState } from 'react'
import useUserActions from '../../../hooks/User/useUserActions'
import { useParams } from 'react-router-dom'
import { User } from '../../../interfaces/User'
import UserAvatar from '../users/UserDetailsAvatar'
import * as formatUtils from '../../utils/format.utils'
import {
    Button,
    Select,
    Space,
    Badge,
    Descriptions,
    Card,
    Modal,
    Input,
    message,
    Alert,
    Spin,
} from 'antd/lib'
import {
    DeleteOutlined,
    ExclamationCircleFilled,
    SaveOutlined,
    MailOutlined,
    LockOutlined,
    PhoneOutlined,
    UserOutlined,
    HomeOutlined,
    BackwardOutlined,
    CrownOutlined,
} from '@ant-design/icons'

const UserDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const { fetchUserById, updateUser, deleteUser } = useUserActions()
    const [user, setUser] = useState<User | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editedUser, setEditedUser] = useState<Partial<User> | null>(null)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const [errors, setErrors] = useState({ email: '', phone: '' })

    useEffect(() => {
        const getUser = async () => {
            const fetchedUser = await fetchUserById(id)
            setUser(fetchedUser)
            setAvatarPreview(`http://localhost:8888/${fetchedUser.avatar}`)
        }
        getUser()
    }, [id])

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        const previewUrl = URL.createObjectURL(file)
        setAvatarPreview(previewUrl)
    }

    const [validations, setValidations] = useState({
        email: true,
        phone: true,
    })

    const validateFields = () => {
        const newValidations = {
            email: formatUtils.isValidEmail(editedUser?.email || ''),
            phone: formatUtils.isValidPhoneNumber(editedUser?.phone || ''),
        }
        setValidations(newValidations)
        return Object.values(newValidations).every((value) => value === true)
    }

    useEffect(() => {
        if (validations.email === false) {
            message.error('Email must be yourname@email.com')
        }
    }, [validations.email])

    const handleSave = async () => {
        const newErrors = { email: '', phone: '' }

        if (!formatUtils.isValidEmail(editedUser?.email || '')) {
            newErrors.email =
                'Invalid email format (example: yourname@email.com)'
        }

        if (!formatUtils.isValidPhoneNumber(editedUser?.phone || '')) {
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
        if (isEditing) {
            setIsEditing(false)
        } else {
            setEditedUser({
                ...user,
            })
            setIsEditing(true)
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    const handleInputChange = (field: string, value: string) => {
        setEditedUser((prev: any) => ({
            ...prev,
            [field]: value,
        }))
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

    const { confirm } = Modal
    const showPromiseConfirm = () => {
        confirm({
            title: 'Do you want to delete these items?',
            icon: <ExclamationCircleFilled />,
            content: ' ',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
                    handleDelete()
                }).catch(() => console.log('Oops errors!'))
            },
            onCancel() {},
        })
    }

    if (!user) {
        return <Spin size="large" fullscreen />
    }

    return (
        <div>
            <Space className="flex flex-col">
                <Space>
                    <Button
                        color="primary"
                        variant="outlined"
                        size="large"
                        icon={<SaveOutlined />}
                        onClick={isEditing ? handleSave : handleEditToggle}
                    >
                        {isEditing ? 'Save' : 'Edit'}
                    </Button>
                    {isEditing && (
                        <Button
                            color="default"
                            size="large"
                            variant="outlined"
                            icon={<BackwardOutlined />}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        color="danger"
                        variant="outlined"
                        size="large"
                        icon={<DeleteOutlined />}
                        onClick={showPromiseConfirm}
                    >
                        Delete
                    </Button>
                </Space>
                <Descriptions.Item label="Avatar">
                    {isEditing ? (
                        <UserAvatar
                            avatar={
                                avatarPreview ||
                                `http://localhost:8888/${user.avatar}`
                            }
                            onDrop={onDrop}
                            isEditing={isEditing}
                        />
                    ) : (
                        <img
                            src={`http://localhost:8888/${user.avatar}`}
                            alt="avatar"
                            style={{
                                width: 300,
                                height: 300,
                                borderRadius: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    )}
                </Descriptions.Item>
                <Card title="User informations">
                    <Descriptions layout="vertical">
                        <Descriptions.Item label="Name">
                            {isEditing ? (
                                <Input
                                    prefix={<UserOutlined />}
                                    size="large"
                                    type="text"
                                    value={editedUser?.name || ''}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'name',
                                            e.target.value
                                        )
                                    }
                                />
                            ) : (
                                user.name
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Role">
                            {isEditing ? (
                                <Select
                                    size="large"
                                    defaultValue={editedUser?.role || user.role}
                                    onChange={(value) =>
                                        handleInputChange('role', value)
                                    }
                                >
                                    <Select.Option value="admin">
                                        Admin
                                    </Select.Option>
                                    <Select.Option value="user">
                                        User
                                    </Select.Option>
                                </Select>
                            ) : (
                                <Button
                                    color={
                                        user.role === 'admin'
                                            ? 'primary'
                                            : 'default'
                                    }
                                    variant="filled"
                                    className="uppercase"
                                    icon={
                                        user.role === 'admin' ? (
                                            <CrownOutlined />
                                        ) : (
                                            <UserOutlined />
                                        )
                                    }
                                >
                                    {user.role}
                                </Button>
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Status">
                            <Badge
                                style={{ marginRight: 10 }}
                                color={
                                    user.status === 'active' ? 'green' : 'red'
                                }
                                status="processing"
                            />
                            {isEditing ? (
                                <Select
                                    size="large"
                                    defaultValue={editedUser?.status || ''}
                                    onChange={(value) =>
                                        handleInputChange('status', value)
                                    }
                                >
                                    <Select.Option value="active">
                                        Active
                                    </Select.Option>
                                    <Select.Option value="inactive">
                                        Inactive
                                    </Select.Option>
                                </Select>
                            ) : (
                                user.status.charAt(0).toUpperCase() +
                                user.status.slice(1)
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Address">
                            {isEditing ? (
                                <Input
                                    prefix={<HomeOutlined />}
                                    size="large"
                                    type="text"
                                    value={editedUser?.address || ''}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'address',
                                            e.target.value
                                        )
                                    }
                                />
                            ) : (
                                user.address
                            )}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
                <Card title="Private">
                    <Descriptions layout="vertical">
                        <Descriptions.Item label="Email">
                            {isEditing ? (
                                <div className="w-full">
                                    <Input
                                        prefix={<MailOutlined />}
                                        size="large"
                                        type="email"
                                        value={editedUser?.email || ''}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'email',
                                                e.target.value
                                            )
                                        }
                                        status={
                                            validations.email ? '' : 'error'
                                        }
                                    />
                                    {errors.email && (
                                        <Alert
                                            message={errors.email}
                                            type="error"
                                            showIcon
                                        />
                                    )}
                                </div>
                            ) : (
                                user.email
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Password">
                            {isEditing ? (
                                <Input
                                    prefix={<LockOutlined />}
                                    size="large"
                                    type="password"
                                    value={editedUser?.password || ''}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'password',
                                            e.target.value
                                        )
                                    }
                                />
                            ) : user.role === 'admin' ? (
                                user.password
                            ) : (
                                'You do not have permission to view this field'
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone">
                            {isEditing ? (
                                <div className="w-full">
                                    <Input
                                        prefix={<PhoneOutlined />}
                                        size="large"
                                        type="tel"
                                        value={editedUser?.phone || ''}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'phone',
                                                e.target.value
                                            )
                                        }
                                        status={
                                            validations.phone ? '' : 'error'
                                        }
                                    />
                                    {errors.phone && (
                                        <Alert
                                            message={errors.phone}
                                            type="error"
                                            showIcon
                                        />
                                    )}
                                </div>
                            ) : (
                                user.phone
                            )}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
                <Card title="Recent activities">
                    <Descriptions>
                        <Descriptions.Item label="Created at">
                            {user.createdAt}
                        </Descriptions.Item>
                        <Descriptions.Item label="Updated at">
                            {user.updatedAt}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            </Space>
        </div>
    )
}

export default UserDetail
