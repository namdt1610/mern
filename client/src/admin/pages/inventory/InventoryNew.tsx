import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Space, message, Button, Row, Col } from 'antd'
import { SaveOutlined, BackwardOutlined } from '@ant-design/icons'
import { useAddInventoryItemMutation } from 'services/InventoryApi'
import { Inventory } from 'types/Inventory'
import ProductImage from './InventoryDetailsImage'
import ProductForm from './InventoryDetailsForm'

const InventoryNew: React.FC = () => {
    const navigate = useNavigate()
    const [addProduct] = useAddInventoryItemMutation()

    const [newProduct, setNewProduct] = useState<Partial<Inventory>>({
        name: '',
        sku: '',
        category: '',
        price: 0,
        stock: 0,
        status: 'available',
        description: '',
        imageUrl: '',
    })

    const handleImageChange = (imageUrl: string) => {
        setNewProduct((prev) => ({
            ...prev,
            image: imageUrl,
        }))
    }

    const handleSave = async () => {
        try {
            // Validate required fields
            if (!newProduct.name || !newProduct.sku || !newProduct.category) {
                message.error('Please fill in all required fields')
                return
            }

            await addProduct(newProduct).unwrap()
            message.success('Product added successfully')
            navigate('/admin/inventory')
        } catch (error: any) {
            const errorMessage = error?.data?.message || 'Failed to add product'
            message.error(errorMessage)
        }
    }

    const handleCancel = () => {
        navigate('/admin/inventory')
    }

    return (
        <div className="py-4">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Card className="items-center justify-center flex card-border">
                    <Space>
                        <Button
                            type="primary"
                            size="middle"
                            icon={<SaveOutlined />}
                            onClick={handleSave}
                            className="btn-border btn-hover"
                        >
                            Save
                        </Button>
                        <Button
                            type="default"
                            size="middle"
                            icon={<BackwardOutlined />}
                            onClick={handleCancel}
                            className="btn-border btn-hover"
                        >
                            Cancel
                        </Button>
                    </Space>
                </Card>

                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={10} lg={8}>
                        <ProductImage
                            image={newProduct.imageUrl || ''}
                            isEditing={true}
                            onImageChange={handleImageChange}
                        />
                    </Col>

                    <Col xs={24} sm={12} md={14} lg={16}>
                        <ProductForm
                            product={newProduct as Inventory}
                            isEditing={true}
                            editedProduct={newProduct}
                            onInputChange={(field, value) =>
                                setNewProduct((prev) => ({
                                    ...prev,
                                    [field]: value,
                                }))
                            }
                        />
                    </Col>
                </Row>
            </Space>
        </div>
    )
}

export default InventoryNew
