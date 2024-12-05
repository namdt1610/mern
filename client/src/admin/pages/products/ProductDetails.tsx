import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    useGetProductByIdQuery,
    useUpdateProductMutation,
} from 'services/ProductApi' // Giả sử API này trả về dữ liệu sản phẩm
import {
    Card,
    Typography,
    Spin,
    Button,
    Space,
    Empty,
    Input,
    Form,
    message,
    Image,
    Upload,
    UploadProps,
} from 'antd'
import { RcFile } from 'antd/es/upload'
import LoadingError from 'components/LoadingError'

const { Title, Text } = Typography

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>() // Lấy id từ URL
    const navigate = useNavigate()

    // Gọi API để lấy thông tin sản phẩm
    const {
        data: product,
        isLoading,
        isError,
        refetch,
    } = useGetProductByIdQuery(id || '')
    const [updateProduct, { isLoading: isUpdating }] =
        useUpdateProductMutation()

    const [isEditing, setIsEditing] = useState(false) // Trạng thái chỉnh sửa
    const [form] = Form.useForm()

    const handleSave = async (values: any) => {
        try {
            // Gửi request cập nhật sản phẩm, bao gồm cả ảnh nếu có thay đổi
            await updateProduct({ id, ...values }).unwrap()
            message.success('Product updated successfully')
            setIsEditing(false)
        } catch (error: any) {
            message.error('Failed to update product. Please try again.')
            console.error('Error from backend:', error)
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
        form.resetFields()
    }

    const handleImageChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`)
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`)
        }
    }

    if (isLoading || isUpdating) {
        return <Spin size="large" tip="Loading..." />
    }

    if (isError || !product) {
        return <Empty description="Product not found" />
    }

    return (
        <Card title={`Product Details - ${product?.name}`} className="my-4">
            {isEditing ? (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    initialValues={product} // Đảm bảo form bắt đầu với dữ liệu sản phẩm hiện tại
                >
                    <Form.Item
                        label="Product Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter product name',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Price" name="price">
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item label="Status" name="isActive">
                        <Input type="checkbox" />
                    </Form.Item>

                    {/* Upload hình ảnh */}
                    <Form.Item label="Image" name="imageUrl">
                        <Upload
                            name="file"
                            action="/upload" // Địa chỉ API để upload hình ảnh (điều chỉnh theo API của bạn)
                            listType="picture-card"
                            onChange={handleImageChange}
                            showUploadList={false} // Nếu bạn không muốn hiển thị danh sách ảnh đã tải lên
                            beforeUpload={(file: RcFile) => {
                                // Kiểm tra loại file trước khi upload
                                const isImage = file.type.startsWith('image/')
                                if (!isImage) {
                                    message.error(
                                        'You can only upload image files!'
                                    )
                                }
                                return isImage
                            }}
                        >
                            {product?.imageUrl ? (
                                <Image
                                    src={product?.imageUrl}
                                    alt={product?.name}
                                    width={100}
                                />
                            ) : (
                                <div>+ Upload</div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isUpdating}
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
                        <Text>{product?.name}</Text>
                    </div>

                    <div>
                        <Title level={5}>Price:</Title>
                        <Text>{product?.price}</Text>
                    </div>

                    <div>
                        <Title level={5}>Status:</Title>
                        <Text>{product?.isActive ? 'Active' : 'Inactive'}</Text>
                    </div>

                    {/* Hiển thị hình ảnh sản phẩm */}
                    <div>
                        <Title level={5}>Image:</Title>
                        <Image
                            width={200}
                            src={product?.imageUrl}
                            alt={product?.name}
                        />
                    </div>

                    <Space>
                        <Button
                            type="primary"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </Button>
                        <Button onClick={() => navigate('/admin/products')}>
                            Back
                        </Button>
                    </Space>
                </Space>
            )}
        </Card>
    )
}

export default ProductDetails
