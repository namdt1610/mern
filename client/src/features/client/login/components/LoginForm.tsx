import React from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { KeyOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '@/services/AuthApi'
import { getUserFromCookie } from '@/utils/useGetToken'
import styles from '@/styles/GlassCard.module.scss'

type LoginFormProps = {
    from: string
}

const LoginForm: React.FC<LoginFormProps> = ({ from }) => {
    const navigate = useNavigate()
    const [login, { isLoading, error }] = useLoginMutation()
    const userId = getUserFromCookie()

    const onFinish = async (values: { email: string; password: string }) => {
        try {
            await login({
                email: values.email,
                password: values.password,
            }).unwrap()
            userId
            message.success('Login successfully!')
            navigate(from ?? '/')
        } catch (err: any) {
            if ('data' in err) {
                message.error(err.data?.message || 'Login fail!')
            } else {
                message.error('Login fail! Please try again.')
            }
            console.error('Login error:', err)
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        message.error('Please fill in all required fields!')
        console.log('Failed:', errorInfo)
    }

    return (
        <Form
            style={{ width: '100%' }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            layout="vertical"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please input your email!' },
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                ]}
            >
                <Input
                    className={styles.glassInput}
                    prefix={<UserOutlined />}
                    size="large"
                    autoComplete="email"
                    placeholder="Enter your email"
                />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: 'Please input your password!' },
                ]}
            >
                <Input.Password
                    className={styles.glassInput}
                    prefix={<KeyOutlined />}
                    size="large"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={isLoading} // Thêm loading khi đang gọi API
                    className={styles.glassButton}
                    style={{ width: '100%' }}
                >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm
