// UserForm.tsx

import React from 'react'
import {
    Alert,
    Badge,
    Button,
    Card,
    Descriptions,
    Input,
    Select,
    Space,
} from 'antd/lib'
import {
    CrownOutlined,
    HomeOutlined,
    KeyOutlined,
    LockOutlined,
    MailOutlined,
    PhoneOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { IUser } from '@/types/IUser'
import { getUserFromCookie } from '@/utils/useGetToken'

interface UserFormProps {
    user: IUser
    isEditing: boolean
    editedUser: Partial<IUser>
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
    if (!user) {
        return null
    }

    const userRole = getUserFromCookie()?.role
    return (
        <>
            <Space direction="vertical" size="large">
                <Card title="Main informations" className="card-border">
                    <Descriptions layout="vertical">
                        <Descriptions.Item label="Id">
                            {isEditing ? (
                                <Input
                                    disabled
                                    prefix={<KeyOutlined />}
                                    size="large"
                                    value={editedUser._id || ''}
                                    onChange={(e) =>
                                        onInputChange('_id', e.target.value)
                                    }
                                />
                            ) : (
                                user._id
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Name">
                            {isEditing ? (
                                <Input
                                    prefix={<UserOutlined />}
                                    size="large"
                                    value={editedUser.name || ''}
                                    onChange={(e) =>
                                        onInputChange('name', e.target.value)
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
                                        onInputChange('role', value)
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
                                        onInputChange('status', value)
                                    }
                                >
                                    <Select.Option value="active">
                                        Active
                                    </Select.Option>
                                    <Select.Option value="inactive">
                                        Inactive
                                    </Select.Option>
                                </Select>
                            ) : // Add null check and provide default value
                            user.status ? (
                                user.status.charAt(0).toUpperCase() +
                                user.status.slice(1)
                            ) : (
                                'N/A'
                            )}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
                <Card title="Contact informations" className="card-border">
                    <Descriptions layout="vertical">
                        <Descriptions.Item label="Email">
                            {isEditing ? (
                                <div className="w-full">
                                    <Input
                                        prefix={<MailOutlined />}
                                        size="large"
                                        type="email"
                                        value={editedUser.email || ''}
                                        onChange={(e) =>
                                            onInputChange(
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
                                    value={editedUser.password || ''}
                                    onChange={(e) =>
                                        onInputChange(
                                            'password',
                                            e.target.value
                                        )
                                    }
                                />
                            ) : userRole === 'admin' ? (
                                '*'.repeat(8)
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
                                            onInputChange(
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
                        <Descriptions.Item label="Address">
                            {isEditing ? (
                                <Input
                                    prefix={<HomeOutlined />}
                                    size="large"
                                    value={editedUser.address?.address || ''}
                                    onChange={(e) =>
                                        onInputChange('address', e.target.value)
                                    }
                                />
                            ) : (
                                <>
                                    <p>Province: {user.address?.province} </p>
                                    <br />
                                    <p>District: {user.address?.district}</p>
                                    <br />
                                    <p>Ward: {user.address?.ward}</p>
                                    <br />
                                    <p>Address: {user.address?.address}</p>
                                </>
                            )}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>

                <Card title="Recent activities" className="card-border">
                    <Descriptions layout="vertical">
                        <Descriptions.Item label="Created at">
                            {user.createdAt}
                        </Descriptions.Item>
                        <Descriptions.Item label="Updated at">
                            {user.updatedAt}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            </Space>
        </>
    )
}

export default UserForm
