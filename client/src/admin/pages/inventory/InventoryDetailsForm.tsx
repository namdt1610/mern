import React from 'react'
import {Card, Descriptions, Input, InputNumber, Select, Space} from 'antd'
import {BarcodeOutlined, DollarOutlined, NumberOutlined, ShopOutlined, TagOutlined,} from '@ant-design/icons'
import {Inventory} from 'types/Inventory'

interface InventoryFormProps {
    product: Inventory
    isEditing: boolean
    editedProduct: Partial<Inventory>
    onInputChange: (field: string, value: any) => void
}

const InventoryForm: React.FC<InventoryFormProps> = ({
    product,
    isEditing,
    editedProduct,
    onInputChange,
}) => {
    return (
        <>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Card title="Basic Information" className="card-border">
                    <Descriptions layout="vertical">
                        <Descriptions.Item label="Name">
                            {isEditing ? (
                                <Input
                                    prefix={<ShopOutlined />}
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
                        <Descriptions.Item label="Category">
                            {isEditing ? (
                                <Input
                                    prefix={<TagOutlined />}
                                    size="large"
                                    value={editedProduct.category || ''}
                                    onChange={(e) =>
                                        onInputChange(
                                            'category',
                                            e.target.value
                                        )
                                    }
                                />
                            ) : (
                                product.category
                            )}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>

                <Card title="Pricing and Inventory" className="card-border">
                    <Descriptions layout="vertical">
                        <Descriptions.Item label="Price">
                            {isEditing ? (
                                <InputNumber
                                    prefix={<DollarOutlined />}
                                    size="large"
                                    min={0}
                                    value={editedProduct.price || 0}
                                    onChange={(value) =>
                                        onInputChange('price', value)
                                    }
                                    style={{ width: '100%' }}
                                />
                            ) : (
                                `$${product.price}`
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Stock">
                            {isEditing ? (
                                <InputNumber
                                    prefix={<NumberOutlined />}
                                    size="large"
                                    min={0}
                                    value={editedProduct.stock || 0}
                                    onChange={(value) =>
                                        onInputChange('stock', value)
                                    }
                                    style={{ width: '100%' }}
                                />
                            ) : (
                                product.stock
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Status">
                            {isEditing ? (
                                <Select
                                    size="large"
                                    value={
                                        editedProduct.status || product.status
                                    }
                                    onChange={(value) =>
                                        onInputChange('status', value)
                                    }
                                    style={{ width: '100%' }}
                                >
                                    <Select.Option value="available">
                                        Available
                                    </Select.Option>
                                    <Select.Option value="outOfStock">
                                        Out of Stock
                                    </Select.Option>
                                </Select>
                            ) : (
                                product.status
                            )}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>

                <Card title="Description" className="card-border">
                    <Descriptions layout="vertical">
                        <Descriptions.Item label="Product Description">
                            {isEditing ? (
                                <Input.TextArea
                                    size="large"
                                    rows={4}
                                    value={editedProduct.description || ''}
                                    onChange={(e) =>
                                        onInputChange(
                                            'description',
                                            e.target.value
                                        )
                                    }
                                />
                            ) : (
                                product.description
                            )}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>

                <Card title="Timestamps" className="card-border">
                    <Descriptions layout="vertical">
                        <Descriptions.Item label="Created At">
                            {new Date(product.createdAt).toLocaleString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Updated At">
                            {new Date(product.updatedAt).toLocaleString()}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            </Space>
        </>
    )
}

export default InventoryForm
