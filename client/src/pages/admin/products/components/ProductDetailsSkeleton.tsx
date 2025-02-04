import React from 'react'
import { Card, Skeleton, Space, Row, Col, Button } from 'antd'
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons'

const ProductDetailsSkeleton: React.FC = () => {
    return (
        <Card
            title={
                <Skeleton.Input active size="large" style={{ width: 300 }} />
            }
            className="my-4"
            extra={
                <Space>
                    <Button type="dashed" icon={<ReloadOutlined />} disabled>
                        Làm mới
                    </Button>
                    <Button icon={<ArrowLeftOutlined />} disabled>
                        Quay lại
                    </Button>
                </Space>
            }
        >
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Skeleton active paragraph={{ rows: 1 }} />
                </Col>
                <Col span={12}>
                    <Skeleton active paragraph={{ rows: 1 }} />
                </Col>
                <Col span={12}>
                    <Skeleton active paragraph={{ rows: 1 }} />
                </Col>
                <Col span={12}>
                    <Skeleton active paragraph={{ rows: 1 }} />
                </Col>
                <Col span={12}>
                    <Skeleton active paragraph={{ rows: 1 }} />
                </Col>
                <Col span={12}>
                    <Skeleton active paragraph={{ rows: 1 }} />
                </Col>
                <Col span={24}>
                    <Skeleton.Image style={{ width: 200, height: 200 }} />
                </Col>
            </Row>
            <Space style={{ marginTop: '20px' }}>
                <Button type="primary" disabled>
                    Chỉnh sửa
                </Button>
            </Space>
        </Card>
    )
}

export default ProductDetailsSkeleton
