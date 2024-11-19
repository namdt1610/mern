import React from 'react'
import type { FormProps } from 'antd/lib'
import { Button, Checkbox, Form, Input, message } from 'antd/lib'
import useAuthApi from '../../../../hooks/Auth/useAuthApiBeta'
import { useApiContext } from '../../../../contexts/ApiContext'

type FieldType = {
    email?: string
    password?: string
    remember?: boolean
}

type LoginFormProps = {
    from: string
}

const LoginForm: React.FC<LoginFormProps> = ({ from }) => {
    const { login } = useAuthApi()
    const { state } = useApiContext()

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        await login({
            email: values.email,
            password: values.password,
        })
    }

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
        errorInfo
    ) => {
        message.error('Failed to login')
        console.log('Failed:', errorInfo)
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
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={state.loading}
                    disabled={state.loading}
                >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm
