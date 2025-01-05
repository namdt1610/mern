import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Form,
    Input,
    Button,
    Card,
    message,
    Space,
    InputNumber,
    Select,
    Divider,
} from 'antd'
import { SaveOutlined, RollbackOutlined } from '@ant-design/icons'
import { useGetProductsQuery } from '@/services/ProductApi'
import { useAddStockMutation } from '@/services/InventoryApi'
import { useGetUserIdFromCookie } from '@/utils/useGetToken'

interface ImportFormData {
    productId: string
    quantity: number
}

const InventoryImport: React.FC = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const { data: products, isLoading: productsLoading } = useGetProductsQuery()
    const [addStock] = useAddStockMutation()
    const userId = useGetUserIdFromCookie() || null

    const handleSubmit = async (values: ImportFormData) => {
        try {
            await addStock({
                productId: values.productId,
                quantity: values.quantity,
                userId: userId,
            }).unwrap()

            message.success('Stock added successfully')
            navigate('/admin/inventory')
        } catch (error: any) {
            const errorMessage = error?.data?.message || 'Failed to add stock'
            message.error(errorMessage)
        }
    }

    const handleCancel = () => {
        navigate('/admin/inventory')
    }

    return (
        <div className="p-6">
            <Card title="Import Inventory" className="shadow-md">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{ quantity: 1 }}
                >
                    <Form.Item
                        label="Product"
                        name="productId"
                        rules={[
                            {
                                required: true,
                                message: 'Please select a product',
                            },
                        ]}
                    >
                        <Select
                            loading={productsLoading}
                            placeholder="Select a product"
                            showSearch
                            optionFilterProp="children"
                        >
                            {products?.map((product) => (
                                <Select.Option
                                    key={product._id}
                                    value={product._id}
                                >
                                    {product.name} ({product.sku})
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter quantity',
                            },
                            {
                                type: 'number',
                                min: 1,
                                message: 'Quantity must be greater than 0',
                            },
                        ]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            placeholder="Enter quantity"
                            min={1}
                        />
                    </Form.Item>

                    <Divider />

                    <Form.Item>
                        <Space>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                htmlType="submit"
                            >
                                Import Stock
                            </Button>
                            <Button
                                icon={<RollbackOutlined />}
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default InventoryImport
