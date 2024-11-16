import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, message, Spin, Space } from 'antd/lib'
import useProductActions from '../../../hooks/Product/useProductActions'
import { Product } from '../../../interfaces/Product'
import ProductAvatar from './ProductDetailsImage'
import ProductActions from './ProductDetailsActions'
import ProductForm from './ProductDetailsForm'
import * as formatUtils from '../../utils/format.utils'

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const { fetchProductById, updateProduct, deleteProduct } =
        useProductActions()
    const [product, setProduct] = useState<Product | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editedProduct, setEditedProduct] = useState<Partial<Product> | null>(
        null
    )
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const [errors, setErrors] = useState({ name: '', price: '', sku: '' })
    const [validations, setValidations] = useState({
        name: true,
        price: true,
        sku: true,
    })

    useEffect(() => {
        const getProduct = async () => {
            const fetchedProduct = await fetchProductById(id)
            setProduct(fetchedProduct)
            setEditedProduct(fetchedProduct)
            setAvatarPreview(`http://localhost:8888/${fetchedProduct.avatar}`)
        }
        getProduct()
    }, [id])

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        const previewUrl = URL.createObjectURL(file)
        setAvatarPreview(previewUrl)
    }

    const validateFields = () => {
        const newValidations = {
            name: editedProduct?.name ? true : false,
            price: formatUtils.isValidPrice(String(editedProduct?.price || '')),
            sku: editedProduct?.sku ? true : false,
        }
        setValidations(newValidations)
        return Object.values(newValidations).every((value) => value === true)
    }

    const handleSave = async () => {
        const newErrors = { name: '', price: '', sku: '' }

        if (!editedProduct?.name) {
            message.warning('Name is required')
            newErrors.name = 'Name is required'
        }

        if (!formatUtils.isValidPrice(String(editedProduct?.price || ''))) {
            message.warning('Check your price format')
            newErrors.price = 'Invalid price format'
        }

        if (newErrors.name || newErrors.price || newErrors.sku) {
            setErrors(newErrors)
            return
        }

        try {
            if (!validateFields()) {
                message.warning('Please check your input fields')
                return
            }

            const formData = new FormData()
            for (const key in editedProduct) {
                formData.append(key, editedProduct[key])
            }

            if (avatarPreview) {
                const fileInput = document.querySelector('input[type="file"]')
                if ((fileInput as HTMLInputElement)?.files[0]) {
                    formData.append(
                        'avatar',
                        (fileInput as HTMLInputElement).files[0]
                    )
                }
            }

            const loadingMessage = message.loading('Saving...', 0)

            setTimeout(async () => {
                try {
                    const updatedProduct = await updateProduct(id, formData)
                    setProduct(updatedProduct)
                    setIsEditing(false)
                    loadingMessage()
                    message.success('Product updated successfully')
                } catch (error) {
                    console.error('Error during save:', error)
                    loadingMessage()
                    message.error('Error occurred while saving')
                }
            }, 1000)
        } catch (error) {
            console.error('Error during save:', error)
        }
    }

    const handleEditToggle = () => {
        setIsEditing(!isEditing)
    }

    const handleDelete = async () => {
        try {
            await deleteProduct(id)
            message.success('Product deleted successfully')
            console.log('Product deleted successfully')
            window.location.href = '/admin/products'
        } catch (error) {
            console.error('Error during delete:', error)
        }
    }

    if (!product) {
        return <Spin size="large" fullscreen />
    }

    return (
        <div>
            <Space
                className="flex items-center justify-center"
                direction="vertical"
                size="large"
            >
                <ProductActions
                    isEditing={isEditing}
                    onSave={handleSave}
                    onEditToggle={handleEditToggle}
                    onDelete={handleDelete}
                />

                <ProductAvatar
                    image={
                        avatarPreview ||
                        `http://localhost:8888/${product.image}`
                    }
                    onDrop={onDrop}
                    isEditing={isEditing}
                />
                <ProductForm
                    product={product}
                    isEditing={isEditing}
                    editedProduct={editedProduct || {}}
                    onInputChange={(field, value) =>
                        setEditedProduct((prev) => ({
                            ...prev,
                            [field]: value,
                        }))
                    }
                    errors={errors}
                    validations={validations}
                />
            </Space>
        </div>
    )
}

export default ProductDetail
