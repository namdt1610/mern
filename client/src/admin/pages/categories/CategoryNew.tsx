import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCategoryActions from '../../../hooks/useCategoryActions'
import { Category } from '../../../interfaces/Category'
import { Button, Input, Form } from 'antd/lib'

const CategoryNewForm = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const { createCategory } = useCategoryActions()

    const [categoryData, setCategoryData] = useState<Category>({
        name: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCategoryData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async () => {
        try {
            await createCategory(categoryData)
            form.resetFields()
            navigate('/categories')
        } catch (error) {
            console.error('Error creating category:', error)
        }
    }

    return (
        <div className="category-new-form">
            <h2>Create New Category</h2>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Category Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter category name!',
                        },
                    ]}
                >
                    <Input
                        name="name"
                        value={categoryData.name}
                        onChange={handleChange}
                        placeholder="Enter category name"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create Category
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CategoryNewForm
