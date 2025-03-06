import React, { useMemo } from 'react'
import { Badge, Card, Col, Row, Statistic, Table } from 'antd'
import { Pie, Bar } from 'react-chartjs-2'
import { useGetProductsQuery } from '@/services/ProductApi'
import dayjs from 'dayjs'
import 'chart.js/auto'
import { ColumnsType } from 'antd/lib/table'
import { Product } from '@/types/IProduct'

const ProductReport: React.FC = () => {
    const { data: products, error, isLoading } = useGetProductsQuery()

    // Tính toán thống kê
    const bestSellingProducts = useMemo(() => {
        return [...(products || [])].sort((a, b) => b.sold - a.sold).slice(0, 5)
    }, [products])

    const lowStockProducts = useMemo(() => {
        return (products || []).filter((product) => product.stock <= 10)
    }, [products])

    const mostViewedProducts = useMemo(() => {
        return [...(products || [])]
            .sort((a, b) => b.clickCount - a.clickCount)
            .slice(0, 5)
    }, [products])

    // Biểu đồ sản phẩm bán chạy
    const bestSellingChartData = useMemo(() => {
        const labels = bestSellingProducts.map((product) => product.name)
        const data = bestSellingProducts.map((product) => product.sold)
        return {
            labels,
            datasets: [
                {
                    label: 'Top Sold Products',
                    data,
                    backgroundColor: [
                        '#ff6384',
                        '#36a2eb',
                        '#ffce56',
                        '#4bc0c0',
                        '#9966ff',
                    ],
                    hoverBackgroundColor: [
                        '#ff6384',
                        '#36a2eb',
                        '#ffce56',
                        '#4bc0c0',
                        '#9966ff',
                    ],
                },
            ],
        }
    }, [bestSellingProducts])

    // Biểu đồ lượt xem nhiều nhất
    const mostViewedChartData = useMemo(() => {
        const labels = mostViewedProducts.map((product) => product.name)
        const data = mostViewedProducts.map((product) => product.clickCount)
        return {
            labels,
            datasets: [
                {
                    label: 'Most Viewed Products',
                    data,
                    backgroundColor: [
                        '#36a2eb',
                        '#ff6384',
                        '#ffce56',
                        '#4bc0c0',
                        '#9966ff',
                    ],
                    hoverBackgroundColor: [
                        '#36a2eb',
                        '#ff6384',
                        '#ffce56',
                        '#4bc0c0',
                        '#9966ff',
                    ],
                },
            ],
        }
    }, [mostViewedProducts])

    // Cấu hình cột cho bảng sản phẩm sắp hết kho
    const columns: ColumnsType<Product> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
            render: (stock) => (
                <Badge color={stock <= 10 ? 'red' : 'green'} text={stock} />
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (date) => dayjs(date).format('YYYY-MM-DD'),
        },
    ]

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error loading product data</div>
    }

    return (
        <Card className="my-6 card-border">
            <Row gutter={16}>
                <Col span={8}>
                    <Statistic
                        title="Total Products"
                        value={products?.length || 0}
                        suffix="items"
                    />
                </Col>
                <Col span={8}>
                    <Statistic
                        title="Low Stock Products"
                        value={lowStockProducts.length}
                        suffix="items"
                    />
                </Col>
                <Col span={8}>
                    <Statistic
                        title="Top Selling Products"
                        value={bestSellingProducts[0]?.name || 'N/A'}
                    />
                </Col>
            </Row>

            <Row gutter={16} className="mt-4">
                <Col span={12}>
                    <Card title="Top Selling Products">
                        <Pie
                            data={bestSellingChartData}
                            options={{
                                maintainAspectRatio: false,
                            }}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Most Viewed Products">
                        <Bar
                            data={mostViewedChartData}
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { display: true },
                                },
                            }}
                        />
                    </Card>
                </Col>
            </Row>

            <Card className="mt-4" title="Low Stock Products">
                <Table
                    rowKey={(record) => record._id}
                    size="large"
                    dataSource={lowStockProducts}
                    columns={columns}
                    pagination={{ pageSize: 5 }}
                    locale={{
                        emptyText: 'No low stock products',
                    }}
                />
            </Card>
        </Card>
    )
}

export default ProductReport
