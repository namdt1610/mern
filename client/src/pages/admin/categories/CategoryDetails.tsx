import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    useGetCategoryByIdQuery,
    useUpdateCategoryMutation,
} from '@/services/CategoryApi'
import {
    Button,
    Card,
    Col,
    Empty,
    Form,
    Input,
    message,
    Row,
    Select,
    Space,
    Typography,
} from 'antd'
import LoadingError from '@/components/shared/LoadingError'

const { Title, Text } = Typography

const CategoryDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>() // Lấy id từ URL
    const navigate = useNavigate()

    // Lấy thông tin category từ API
    const {
        data: category,
        isLoading,
        isError,
        refetch,
    } = useGetCategoryByIdQuery(id || '')

    // Mutation cập nhật category
    const [updateCategory, error] = useUpdateCategoryMutation()
    const [isEditing, setIsEditing] = useState(false) // Trạng thái chỉnh sửa
    const [form] = Form.useForm()
    if (!id) {
        return <Empty description="Category not found" />
    }
    const handleSave = async (values: any) => {
        console.log('Category updated:', values)
        try {
            // Gửi request cập nhật category
            await updateCategory({ id, data: values }).unwrap()
            message.success('Category updated successfully')
            setIsEditing(false)
        } catch (error: any) {
            // Kiểm tra lỗi trả về từ backend và hiển thị thông báo phù hợp
            if (error?.data?.message) {
                message.error(error.data.message) // Hiển thị thông báo lỗi từ backend
            } else {
                message.error('Failed to update category. Please try again.') // Lỗi chung
            }
            console.error('Error from backend:', error) // Log chi tiết lỗi
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
        form.resetFields()
    }

    if (isLoading || isError) {
        return (
            <LoadingError
                isLoading={isLoading}
                isError={error}
                isLogin={false}
                title="Category Details"
                refetch={refetch}
            />
        )
    }

    if (isError || !category) {
        return <Empty description="Category not found" />
    }

    return (
        <Card title={`Category Details - ${category?.name}`} className="my-4">
            {isEditing ? (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    initialValues={category} // Ensure form starts with current category data
                >
                    <Form.Item
                        label="Category Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter category name',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Status"
                                name="isActive"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select status',
                                    },
                                ]}
                            >
                                <Select>
                                    <Select.Option value={true}>
                                        Active
                                    </Select.Option>
                                    <Select.Option value={false}>
                                        Disabled
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Products Count"
                                name="productsCount"
                            >
                                <Input disabled type="number" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                        >
                            Save
                        </Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </Space>
                </Form>
            ) : (
                <Space
                    direction="vertical"
                    size="large"
                    style={{ width: '100%' }}
                >
                    <div>
                        <Title level={5}>Name:</Title>
                        <Text>{category?.name}</Text>
                    </div>

                    <Row gutter={16}>
                        <Col span={12}>
                            <div>
                                <Title level={5}>Status:</Title>
                                <Text>
                                    {category?.isActive ? 'Active' : 'Disabled'}
                                </Text>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div>
                                <Title level={5}>Products Count:</Title>
                                <Text>{category?.productsCount || 0}</Text>
                            </div>
                        </Col>
                    </Row>

                    <Space>
                        <Button
                            type="primary"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </Button>
                        <Button onClick={() => navigate('/admin/categories')}>
                            Back
                        </Button>
                    </Space>
                </Space>
            )}
        </Card>
    )
}

export default CategoryDetails
