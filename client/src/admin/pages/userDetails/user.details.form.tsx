// UserForm.tsx

import React from 'react'
import { Input, Descriptions, Alert } from 'antd/lib'
import {
    MailOutlined,
    LockOutlined,
    PhoneOutlined,
    HomeOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { User } from '../../../interfaces/user.interface'

interface UserFormProps {
    user: User
    isEditing: boolean
    editedUser: Partial<User>
    onInputChange: (field: string, value: string) => void
    errors: { email: string; phone: string }
    validations: { email: boolean; phone: boolean }
}

const UserForm: React.FC<UserFormProps> = ({
    user,
    isEditing,
    editedUser,
    onInputChange,
    errors,
    validations,
}) => {
    return (
        <Descriptions layout="vertical">
            <Descriptions.Item label="Name">
                {isEditing ? (
                    <Input
                        prefix={<UserOutlined />}
                        size="large"
                        value={editedUser.name || ''}
                        onChange={(e) => onInputChange('name', e.target.value)}
                    />
                ) : (
                    user.name
                )}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
                {isEditing ? (
                    <div className="w-full">
                        <Input
                            prefix={<MailOutlined />}
                            size="large"
                            type="email"
                            value={editedUser.email || ''}
                            onChange={(e) =>
                                onInputChange('email', e.target.value)
                            }
                            status={validations.email ? '' : 'error'}
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
                        value={editedUser.password || ''}
                        onChange={(e) =>
                            onInputChange('password', e.target.value)
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
                            value={editedUser.phone || ''}
                            onChange={(e) =>
                                onInputChange('phone', e.target.value)
                            }
                            status={validations.phone ? '' : 'error'}
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
            <Descriptions.Item label="Address">
                {isEditing ? (
                    <Input
                        prefix={<HomeOutlined />}
                        size="large"
                        value={editedUser.address || ''}
                        onChange={(e) =>
                            onInputChange('address', e.target.value)
                        }
                    />
                ) : (
                    user.address
                )}
            </Descriptions.Item>
        </Descriptions>
    )
}

export default UserForm
