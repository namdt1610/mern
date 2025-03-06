import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddPaymentMethodMutation } from '@/services/PaymentMethodApi'
import { Button, Form, Input } from 'antd'
import { PaymentMethod } from '@/types/PaymentMethod'

const PaymentMethodsNew = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [addPaymentMethod] = useAddPaymentMethodMutation()

    const onFinish = async (values: Partial<PaymentMethod>) => {
        try {
            await addPaymentMethod({
                ...values,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            } as PaymentMethod).unwrap()
            navigate('/admin/payment-methods')
        } catch (error) {
            console.error('Failed to add payment method:', error)
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Add New Payment Method</h1>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input payment method name!',
                        },
                    ]}
                >
                    <Input placeholder="Enter payment method name" />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input payment method description!',
                        },
                    ]}
                >
                    <Input.TextArea
                        rows={4}
                        placeholder="Enter payment method description"
                    />
                </Form.Item>

                <Form.Item>
                    <div className="flex gap-2">
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button
                            onClick={() => navigate('/admin/payment-methods')}
                        >
                            Cancel
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default PaymentMethodsNew
