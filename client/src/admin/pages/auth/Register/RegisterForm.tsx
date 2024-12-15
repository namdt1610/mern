import React from 'react'
import type {FormProps} from 'antd/lib'
import {Button, Form, Input, message} from 'antd/lib'
import useAuthApi from '../../../../hooks/Auth/useAuthApiBeta'
import {useNavigate} from 'react-router-dom'
import {useApiContext} from '../../../../contexts/ApiContext'

type FieldType = {
    email: string
    password: string
    confirmPassword: string
    fullName: string
}

type RegisterFormProps = {
    from: string
}

const RegisterForm: React.FC<RegisterFormProps> = ({ from }) => {
    const navigate = useNavigate()
    const { register } = useAuthApi()
    const { state } = useApiContext()

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        onRegister(values)
    }

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
        errorInfo
    ) => {
        message.error('Failed to register')
        console.log('Failed:', errorInfo)
    }

    const onRegister = async (values: FieldType) => {
        try {
            if (values.password !== values.confirmPassword) {
                message.error('Passwords do not match')
                return
            }

            await register({
                email: values.email,
                password: values.password,
                fullName: values.fullName,
            })
            message.success('Registration successful')
            navigate(from || '/admin/login')
        } catch (error: any) {
            message.error(error?.message || 'Failed to register')
        }
    }

    return (
        <Form
            name="register"
            style={{
                width: 500,
                paddingRight: '50px',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            layout="vertical"
        >
            <Form.Item<FieldType>
                label="Full Name"
                name="fullName"
                rules={[
                    {
                        required: true,
                        message: 'Please input your full name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        type: 'email',
                        message: 'Please input a valid email!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    {
                        min: 6,
                        message: 'Password must be at least 6 characters!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject(
                                new Error('Passwords do not match!')
                            )
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={state.loading}
                    disabled={state.loading}
                >
                    Register
                </Button>
                <span> or </span>
                <Button
                    onClick={() => navigate('/admin/login')}
                    type="primary"
                    loading={state.loading}
                    disabled={state.loading}
                >
                    Login
                </Button>
            </Form.Item>
        </Form>
    )
}

export default RegisterForm
