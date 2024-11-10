import React from 'react'
import type { FormProps } from 'antd/lib'
import { Button, Checkbox, Form, Input, message } from 'antd/lib'
import useAuthApi from '../../../../hooks/useAuthApi'

type FieldType = {
    email?: string
    password?: string
    confirmPassword?: string
    remember?: string
}

const LoginForm: React.FC = () => {
    const { login, loading, error } = useAuthApi()

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        onLogin(values)
    }

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
        errorInfo
    ) => {
        message.error('Failed to login')
        console.log('Failed:', errorInfo)
    }

    const onLogin = async (values: FieldType) => {
        console.log('Logging in:', values)
        await login({ email: values.email, password: values.password })
    }

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{
                width: 500,
                paddingTop: '200px',
                paddingRight: '50px',
            }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
        >
            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
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
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm
