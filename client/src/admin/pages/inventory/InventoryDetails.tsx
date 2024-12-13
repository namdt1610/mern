import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} from 'services/ProductApi'
import { Card, Space, message, Empty, Row, Col } from 'antd'
import LoadingError from 'components/LoadingError'
import { Inventory } from 'types/Inventory'

// Sub-components (you'll need to create these)
import ProductActions from './InventoryDetailsActions'
import ProductImage from './InventoryDetailsImage'
import ProductForm from './InventoryDetailsForm'

const InventoryDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const {
        data: product,
        isLoading,
        isError,
        refetch,
    } = useGetProductByIdQuery(id)
    const [updateProduct] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()

    const [isEditing, setIsEditing] = useState(false)
    const [editedProduct, setEditedProduct] = useState<Partial<Inventory>>({})
    const [imagePreview, setImagePreview] = useState<string | undefined>(
        product?.imageUrl
    )

    useEffect(() => {
        if (product) {
            setEditedProduct(product)
            setImagePreview(product.imageUrl)
        }
    }, [product])

    const handleImageChange = (imageUrl: string) => {
        setEditedProduct((prev) => ({
            ...prev,
            imageUrl: imageUrl,
        }))
    }

    const handleSave = async () => {
        try {
            await updateProduct({ id, ...editedProduct }).unwrap()
            setIsEditing(false)
            message.success('Product updated successfully')
        } catch (error) {
            message.error('Failed to update product')
        }
    }

    const handleEditToggle = () => {
        setIsEditing((prev) => !prev)
    }

    const handleDelete = async () => {
        try {
            await deleteProduct(id!).unwrap()
            message.success('Product deleted successfully')
            navigate('/admin/inventory')
        } catch (error: any) {
            const errorMessage = error?.message || 'Failed to delete product.'
            message.error(errorMessage)
        }
    }

    if (isLoading)
        return (
            <LoadingError
                isLoading={isLoading}
                error={null}
                refetch={refetch}
            />
        )
    if (isError || !product) return <Empty description="Product not found" />

    return (
        <div className="py-4">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={10} lg={8}>
                        <ProductActions
                            isEditing={isEditing}
                            onSave={handleSave}
                            onEditToggle={handleEditToggle}
                            onDelete={handleDelete}
                            onRefetch={refetch}
                        />
                        <div className="py-4">
                            <ProductImage
                                onImageChange={handleImageChange}
                                image={imagePreview || product.imageUrl}
                                isEditing={isEditing}
                            />
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={14} lg={16}>
                        <ProductForm
                            product={product}
                            isEditing={isEditing}
                            editedProduct={editedProduct}
                            onInputChange={(field, value) =>
                                setEditedProduct((prev) => ({
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

export default InventoryDetails