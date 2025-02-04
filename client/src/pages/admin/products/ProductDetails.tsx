import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    useGetProductByIdQuery,
    useUpdateProductMutation,
} from '@/services/ProductApi'
import { useGetCategoriesQuery } from '@/services/CategoryApi'
import {
    Button,
    Card,
    Empty,
    Form,
    Image,
    Input,
    Select,
    Space,
    Spin,
    Typography,
    UploadProps,
    Switch,
    Row,
    Col,
    App,
} from 'antd'
import {
    EditOutlined,
    SaveOutlined,
    ReloadOutlined,
    ArrowLeftOutlined,
} from '@ant-design/icons'
import ImageUploader from './components/ImageUploader'
import ProductDetailsSkeleton from './components/ProductDetailsSkeleton'

const { Title, Text } = Typography

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { message } = App.useApp()

    // Lấy thông tin sản phẩm
    const {
        data: product,
        isLoading,
        isError,
        refetch,
    } = useGetProductByIdQuery(id || '')
    const [updateProduct, { isLoading: isUpdating }] =
        useUpdateProductMutation()

    // Lấy danh sách category
    const { data: categories } = useGetCategoriesQuery()

    const [isEditing, setIsEditing] = useState(false)
    const [form] = Form.useForm()

    const handleSave = async (values: any) => {
        try {
            // Cập nhật sản phẩm, nếu có upload ảnh sẽ được xử lý tại đây
            await updateProduct({ id, ...values }).unwrap()
            message.success('Cập nhật sản phẩm thành công')
            setIsEditing(false)
        } catch (error: any) {
            message.error('Cập nhật sản phẩm thất bại, vui lòng thử lại!')
            console.error('Error from backend:', error)
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
        form.resetFields()
    }

    const handleImageChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} tải lên thành công`)
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} tải lên thất bại`)
        }
    }

    if (isLoading || isUpdating) {
        return <ProductDetailsSkeleton />
    }

    if (isError || !product) {
        return <Empty description="Không tìm thấy sản phẩm" />
    }

    return (
        <Card
            title={`Chi tiết sản phẩm - ${product?.name}`}
            className="my-4"
            extra={
                <Space>
                    <Button
                        type="dashed"
                        onClick={() => refetch()}
                        icon={<ReloadOutlined />}
                    >
                        Làm mới
                    </Button>
                    <Button
                        onClick={() => navigate('/admin/products')}
                        icon={<ArrowLeftOutlined />}
                    >
                        Quay lại
                    </Button>
                </Space>
            }
        >
            {isEditing ? (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    initialValues={{
                        ...product,
                        // Nếu product.isActive là boolean thì không cần chuyển đổi
                        isActive: product?.isActive,
                    }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Tên sản phẩm"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên sản phẩm',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập tên sản phẩm" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Danh mục" name="categoryId">
                                <Select placeholder="Chọn danh mục">
                                    {categories?.map((category) => (
                                        <Select.Option
                                            key={category._id}
                                            value={category._id}
                                        >
                                            {category.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Giá" name="price">
                                <Input
                                    type="number"
                                    placeholder="Nhập giá sản phẩm"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Trạng thái"
                                name="isActive"
                                valuePropName="checked"
                            >
                                <Switch
                                    checkedChildren="Active"
                                    unCheckedChildren="Inactive"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Hình ảnh"
                        name="imageUrl"
                        valuePropName="fileList"
                        getValueFromEvent={(e) =>
                            Array.isArray(e?.fileList) ? e.fileList : []
                        }
                    >
                        <ImageUploader />
                    </Form.Item>

                    <Space size="middle">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isUpdating}
                            icon={<SaveOutlined />}
                        >
                            Lưu
                        </Button>
                        <Button onClick={handleCancel}>Hủy</Button>
                    </Space>
                </Form>
            ) : (
                <div>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Title level={5}>Tên sản phẩm:</Title>
                            <Text>{product?.name}</Text>
                        </Col>
                        <Col span={12}>
                            <Title level={5}>Danh mục:</Title>
                            <Text>{product?.category?.name}</Text>
                        </Col>
                        <Col span={12}>
                            <Title level={5}>Lượt xem:</Title>
                            <Text>{product?.clickCount}</Text>
                        </Col>
                        <Col span={12}>
                            <Title level={5}>Đã bán:</Title>
                            <Text>{product?.sold}</Text>
                        </Col>
                        <Col span={12}>
                            <Title level={5}>Giá:</Title>
                            <Text>{product?.price}</Text>
                        </Col>
                        <Col span={12}>
                            <Title level={5}>Trạng thái:</Title>
                            <Text>
                                {product?.isActive ? 'Active' : 'Inactive'}
                            </Text>
                        </Col>
                        <Col span={24}>
                            <Title level={5}>Hình ảnh sản phẩm:</Title>
                            <Image
                                width={200}
                                src={product?.imageUrl}
                                alt={product?.name}
                                style={{ borderRadius: '4px' }}
                            />
                        </Col>
                    </Row>
                    <Space style={{ marginTop: '20px' }}>
                        <Button
                            type="primary"
                            onClick={() => setIsEditing(true)}
                            icon={<EditOutlined />}
                        >
                            Chỉnh sửa
                        </Button>
                    </Space>
                </div>
            )}
        </Card>
    )
}

export default ProductDetails
