import { Form, Input, Button, Select, Divider, Result, App } from 'antd'
import React from 'react'
import { useUpdateUserMutation, useGetUserByIdQuery } from '@/services/UserApi'

const { Option } = Select

export default function ProfileSettings({
    userId,
}: {
    userId: string 
}) {
    const { message } = App.useApp()

    const [form] = Form.useForm()
    const [updateUser] = useUpdateUserMutation()
    const { data: user } = useGetUserByIdQuery(userId!)

    React.useEffect(() => {
        if (user) {
            form.setFieldsValue({
                user: userId,
                name: user.name,
                email: user.email,
                username: user.username,
                phone: user.phone,
                address: user.address,
                status: user.status,
                role: user.role,
            })
        }
    }, [user, form])

    const onFinish = async (values: any) => {
        try {
            await updateUser({ userId, ...values }).unwrap()
            message.success('Profile updated successfully')
        } catch (error) {
            message.error('Failed to update profile')
            console.error('Failed to update profile:', error)
        }
    }

    if (!user)
        return (
            <Result
                status="403"
                title="403"
                subTitle="Please log in to continue."
                extra={<Button href="/login">Log in</Button>}
            />
        )

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="max-w-2xl mx-auto"
        >
            <Divider>Basic Information</Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[
                        { required: true, message: 'Please input your name!' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Username" name="username">
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        {
                            type: 'email',
                            message: 'Please enter a valid email!',
                        },
                    ]}
                >
                    <Input type="email" />
                </Form.Item>

                <Form.Item label="Phone" name="phone">
                    <Input />
                </Form.Item>
            </div>

            <Divider>Address Information</Divider>
            <Form.Item label="Province" name="province">
                <Input>{user.address?.province}</Input>
            </Form.Item>
            <Form.Item label="District" name="district">
                <Input>{user.address?.district}</Input>
            </Form.Item>
            <Form.Item label="Ward" name="ward">
                <Input>{user.address?.ward}</Input>
            </Form.Item>
            <Form.Item label="Address" name="address">
                <Input.TextArea />
            </Form.Item>

            <Divider>Account Status</Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item label="Status" name="status">
                    <Select disabled>
                        <Option value="active">Active</Option>
                        <Option value="inactive">Inactive</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Role" name="role">
                    <Select disabled>
                        <Option value="user">User</Option>
                        <Option value="admin">Admin</Option>
                    </Select>
                </Form.Item>
            </div>

            <Form.Item className="text-right">
                <Button type="primary" htmlType="submit">
                    Save Changes
                </Button>
            </Form.Item>
        </Form>
    )
}
