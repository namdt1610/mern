import React from 'react'
import { Card, Input, Select, Space, Descriptions } from 'antd/lib'
import { Product } from '../../../types/Product'
import {
    UserOutlined,
    DollarOutlined,
    BarcodeOutlined,
} from '@ant-design/icons'

interface ProductFormProps {
    product: Product
    isEditing: boolean
    editedProduct: Partial<Product>
    onInputChange: (field: string, value: string) => void
    errors: { name: string; price: string; sku: string }
    validations: { name: boolean; price: boolean; sku: boolean }
}

const ProductForm: React.FC<ProductFormProps> = ({
    product,
    isEditing,
    editedProduct,
    onInputChange,
    errors,
    validations,
}) => {
    return (
        <Space direction="vertical" size="large">
            <Card title="Product Information">
                <Descriptions layout="vertical">
                    <Descriptions.Item label="Name">
                        {isEditing ? (
                            <Input
                                prefix={<UserOutlined />}
                                size="large"
                                value={editedProduct.name || ''}
                                onChange={(e) =>
                                    onInputChange('name', e.target.value)
                                }
                            />
                        ) : (
                            product.name
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Price">
                        {isEditing ? (
                            <Input
                                prefix={<DollarOutlined />}
                                size="large"
                                value={editedProduct.price || ''}
                                onChange={(e) =>
                                    onInputChange('price', e.target.value)
                                }
                            />
                        ) : (
                            product.price
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="SKU">
                        {isEditing ? (
                            <Input
                                prefix={<BarcodeOutlined />}
                                size="large"
                                value={editedProduct.sku || ''}
                                onChange={(e) =>
                                    onInputChange('sku', e.target.value)
                                }
                            />
                        ) : (
                            product.sku
                        )}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
            <Card title="Additional Information">
                <Descriptions layout="vertical">
                    <Descriptions.Item label="Category">
                        {isEditing ? (
                            <Select
                                size="large"
                                defaultValue={
                                    editedProduct?.category || product.category
                                }
                                onChange={(value) =>
                                    onInputChange('category', value)
                                }
                            >
                                {/* Add category options here */}
                            </Select>
                        ) : (
                            product.category
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Stock">
                        {isEditing ? (
                            <Input
                                size="large"
                                value={editedProduct.stock || ''}
                                onChange={(e) =>
                                    onInputChange('stock', e.target.value)
                                }
                            />
                        ) : (
                            product.stock
                        )}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </Space>
    )
}

export default ProductForm
