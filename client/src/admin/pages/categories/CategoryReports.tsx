import React from 'react'
import {useGetCategoriesQuery} from '@/services/CategoryApi'
import {Card, Col, Empty, Row, Spin, Statistic, Table} from 'antd'

const CategoryReports: React.FC = () => {
    const { data: categories = [], isLoading } = useGetCategoriesQuery() // Lấy danh sách từ API

    // Tính toán thống kê
    const totalCategories = categories.length
    const activeCategories = categories.filter((cat) => cat.isActive).length
    const disabledCategories = totalCategories - activeCategories

    return (
        <div>
            <h1>Category Reports</h1>

            {/* Cards thống kê tổng quan */}
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Total Categories"
                            value={totalCategories}
                            loading={isLoading}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Active Categories"
                            value={activeCategories}
                            loading={isLoading}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Disabled Categories"
                            value={disabledCategories}
                            loading={isLoading}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Danh sách chi tiết */}
            <Card title="Categories List" className="my-4">
                {isLoading ? (
                    <Spin />
                ) : categories.length ? (
                    <Table
                        dataSource={categories}
                        rowKey="id"
                        columns={[
                            {
                                title: 'Name',
                                dataIndex: 'name',
                            },
                            {
                                title: 'Products Count',
                                dataIndex: 'productsCount',
                                render: (count) => count || 'N/A', // Hiển thị N/A nếu không có dữ liệu
                            },
                            {
                                title: 'Status',
                                dataIndex: 'isActive',
                                render: (isActive: boolean) =>
                                    isActive ? 'Active' : 'Disabled',
                            },
                        ]}
                    />
                ) : (
                    <Empty description="No categories available" />
                )}
            </Card>
        </div>
    )
}

export default CategoryReports
