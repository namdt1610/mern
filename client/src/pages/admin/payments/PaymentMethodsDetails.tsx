import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    useGetPaymentMethodsQuery,
    useUpdatePaymentMethodMutation,
} from '@/services/PaymentMethodApi'
import { Button, Form, Input, Spin } from 'antd'
import { PaymentMethod } from '@/types/PaymentMethod'

const PaymentMethodsDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form] = Form.useForm()

    const { data: paymentMethods, isLoading } = useGetPaymentMethodsQuery()
    const [updatePaymentMethod] = useUpdatePaymentMethodMutation()

    const paymentMethod = paymentMethods?.find((pm) => pm._id === id)

    React.useEffect(() => {
        if (paymentMethod) {
            form.setFieldsValue(paymentMethod)
        }
    }, [paymentMethod, form])

    const onFinish = async (values: Partial<PaymentMethod>) => {
        if (!id) return

        try {
            await updatePaymentMethod({
                id,
                paymentMethod: {
                    ...values,
                    updatedAt: new Date().toISOString(),
                } as PaymentMethod,
            }).unwrap()
            navigate('/admin/payment-methods')
        } catch (error) {
            console.error('Failed to update payment method:', error)
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        )
    }

    if (!paymentMethod) {
        return <div>Payment method not found</div>
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Payment Method Details</h1>
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
                            Save Changes
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

export default PaymentMethodsDetails
