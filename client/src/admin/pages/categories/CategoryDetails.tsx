import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Space, Typography, Descriptions, Input } from 'antd/lib'
import { Category } from '../../../interfaces/Category'
import useCategoryActions from '../../../hooks/useCategoryActions'

const { Title } = Typography

export default function CategoryDetails() {
    const { id } = useParams<{ id: string }>()
    const { fetchCategoryById, deleteCategory, updateCategory } =
        useCategoryActions()
    const [category, setCategory] = useState<Category | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [categoryData, setCategoryData] = useState<Category | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const getCategory = async () => {
            if (id) {
                const data = await fetchCategoryById(id)
                setCategory(data)
                setCategoryData(data)
            }
        }
        getCategory()
    }, [id])

    const handleDelete = async () => {
        if (id) {
            await deleteCategory(id)
            navigate('/admin/categories')
        }
    }

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleCancelEdit = () => {
        setIsEditing(false)
        setCategoryData(category) // Restore original data if canceled
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryData({
            ...categoryData,
            name: e.target.value,
        })
    }

    const handleSave = async () => {
        if (categoryData) {
            await updateCategory(id, categoryData.name)
            setIsEditing(false)
            setCategory(categoryData)
        }
    }

    return (
        <>
            {category ? (
                <>
                    <div className="my-4">
                        <Space>
                            {isEditing ? (
                                <>
                                    <Button onClick={handleSave} type="primary">
                                        Save
                                    </Button>
                                    <Button
                                        onClick={handleCancelEdit}
                                        type="default"
                                    >
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button onClick={handleEdit} type="primary">
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={handleDelete}
                                        type="primary"
                                    >
                                        Delete
                                    </Button>
                                </>
                            )}
                        </Space>
                    </div>
                    <Title level={2}>{category.name}</Title>
                    <Descriptions
                        title="Category Details"
                        layout="vertical"
                        bordered
                    >
                        <Descriptions.Item label="Name">
                            {isEditing ? (
                                <Input
                                    name="name"
                                    value={categoryData?.name}
                                    onChange={handleChange}
                                />
                            ) : (
                                category.name
                            )}
                        </Descriptions.Item>
                        {/* Add more fields if necessary */}
                    </Descriptions>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </>
    )
}
