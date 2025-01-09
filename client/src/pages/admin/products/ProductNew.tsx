import React, { useState } from 'react'
import { Button, Card, Form, Input, message, Upload } from 'antd/lib'
import { UploadOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAddProductMutation } from '@/services/ProductApi'
import { useGetCategoriesQuery } from '@/services/CategoryApi'
import { Select } from 'antd'

const ProductNew: React.FC = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [createProduct, { isLoading, isError }] = useAddProductMutation()
    const { data: categories } = useGetCategoriesQuery()
    const [fileList, setFileList] = useState<any[]>([])

    const handleFinish = async (values: any) => {
        const productData = {
            name: values.name,
            category: values.category,
            price: values.price,
            description: values.description,
            images: fileList.map((file) => file.originFileObj),
        }

        try {
            await createProduct(productData).unwrap()
            message.success('Product created successfully')
            navigate('/admin/products/new')
        } catch (error: any) {
            // Nếu lỗi trả về có dạng thông báo từ backend
            if (error.data && error.data.errors) {
                const backendErrors = error.data.errors
                const fieldErrors: any[] = []

                // Map lỗi từ backend tới form
                for (const [field, message] of Object.entries(backendErrors)) {
                    fieldErrors.push({
                        name: field,
                        errors: [message as string],
                    })
                }

                // Gán lỗi cho form
                form.setFields(fieldErrors)
            } else {
                // Hiển thị lỗi chung nếu không phải lỗi trường cụ thể
                message.error(error.data?.message || 'An error occurred')
            }
        }
    }

    // Upload images
    const handleUploadChange = ({ fileList }: any) => {
        setFileList(fileList)
    }

    return (
        <Card className="card-border my-4">
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item
                    name="name"
                    label="Product Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the product name',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Category"
                    rules={[
                        {
                            required: true,
                            message: 'Please select the product category',
                        },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Select a category"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option?.label ?? '')
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        options={categories?.map((category) => ({
                            value: category._id,
                            label: category.name,
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the product price',
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the product description',
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    name="images"
                    label="Product Images"
                    valuePropName="fileList"
                    getValueFromEvent={handleUploadChange}
                >
                    <Upload
                        listType="picture"
                        beforeUpload={() => false}
                        onChange={handleUploadChange}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Create Product
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default ProductNew
