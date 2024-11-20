import React, { useState } from 'react'
import { Form, Input, Button, message, Upload, Card } from 'antd/lib'
import { UploadOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import useProductActions from '../../../hooks/Product/useProductActions'

const ProductNew: React.FC = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const { createProduct } = useProductActions()
    const [fileList, setFileList] = useState<any[]>([])

    const handleFinish = async (values: any) => {
        const formData = new FormData()
        for (const key in values) {
            formData.append(key, values[key])
        }
        fileList.forEach((file) => {
            formData.append('images', file.originFileObj)
        })

        try {
            await createProduct(formData)
            message.success('Product created successfully')
            navigate('/admin/products')
        } catch (error) {
            message.error('Error occurred while creating product')
        }
    }

    const handleUploadChange = ({ fileList }: any) => {
        setFileList(fileList)
    }

    return (
        <Card className='card-border my-4'>
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
                    <Button type="primary" htmlType="submit">
                        Create Product
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default ProductNew
