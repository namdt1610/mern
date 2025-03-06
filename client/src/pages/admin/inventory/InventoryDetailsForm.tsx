import React, { useEffect } from 'react'
import { Card, Descriptions, Input, InputNumber, Select, Space } from 'antd'
import { BarcodeOutlined, NumberOutlined, TagOutlined } from '@ant-design/icons'
import { IInventory } from '@/types/IInventory'
import dayjs from 'dayjs'

interface InventoryDetailsFormProps {
    inventory: Inventory
    isEditing: boolean
    editedInventory: Partial<Inventory>
    onChange: (field: string, value: any) => void
}

const InventoryDetailsForm: React.FC<InventoryDetailsFormProps> = ({
    inventory,
    isEditing,
    editedInventory,
    onChange,
}) => {
    useEffect(() => {
        if (isEditing && editedInventory.quantity !== undefined) {
            const newStatus =
                editedInventory.quantity < 1 ? 'out-of-stock' : 'in-stock'
            if (newStatus !== editedInventory.status) {
                onChange('status', newStatus)
            }
        }
    }, [editedInventory.quantity, isEditing])

    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card title="Product Information" className="shadow-md">
                <Descriptions layout="vertical" column={3}>
                    <Descriptions.Item label="SKU">
                        {inventory.product.sku}
                    </Descriptions.Item>
                    <Descriptions.Item label="Product Name">
                        {inventory.product.name}
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            <Card title="Stock Information" className="shadow-md">
                <Descriptions layout="vertical" column={3}>
                    <Descriptions.Item label="Current Stock">
                        {isEditing ? (
                            <InputNumber
                                prefix={<NumberOutlined />}
                                min={0}
                                value={
                                    editedInventory.quantity ??
                                    inventory.quantity
                                }
                                onChange={(value) =>
                                    onChange('quantity', value)
                                }
                                style={{ width: '100%' }}
                            />
                        ) : (
                            inventory.quantity
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                        {isEditing ? (
                            <Select
                                value={
                                    editedInventory.status ?? inventory.status
                                }
                                onChange={(value) => onChange('status', value)}
                                style={{ width: '100%' }}
                            >
                                <Select.Option value="in-stock">
                                    In Stock
                                </Select.Option>
                                <Select.Option value="out-of-stock">
                                    Out of Stock
                                </Select.Option>
                                <Select.Option value="discontinued">
                                    Discontinued
                                </Select.Option>
                            </Select>
                        ) : (
                            <span className={`status-${inventory.status}`}>
                                {inventory.status
                                    .replace('-', ' ')
                                    .toUpperCase()}
                            </span>
                        )}
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            <Card title="History" className="shadow-md">
                <Descriptions layout="vertical" column={2}>
                    <Descriptions.Item label="Created At">
                        {dayjs(inventory.createdAt).format(
                            'YYYY-MM-DD HH:mm:ss'
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Last Updated">
                        {dayjs(inventory.updatedAt).format(
                            'YYYY-MM-DD HH:mm:ss'
                        )}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </Space>
    )
}

export default InventoryDetailsForm
