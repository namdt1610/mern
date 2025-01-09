import React, { useEffect, useRef } from 'react'
import { Card, Row, Col, Statistic, Table, Progress, Spin } from 'antd'
import { motion } from 'framer-motion'
import { LineChart, PieChart } from 'chartist'
import 'chartist/dist/index.css'
import {
    ShoppingOutlined,
    UserOutlined,
    BookOutlined,
    DollarOutlined,
} from '@ant-design/icons'
import { useGetDashboardStatsQuery } from '@/services/DashboardApi'

const AdminDashboard: React.FC = () => {
    const { data: dashboardData, isLoading } = useGetDashboardStatsQuery()
    const lineChartRef = useRef<HTMLDivElement>(null)
    const pieChartRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (dashboardData?.salesData && lineChartRef.current) {
            new LineChart(
                lineChartRef.current,
                {
                    labels: dashboardData.salesData.map((item) => item._id),
                    series: [dashboardData.salesData.map((item) => item.sales)],
                },
                {
                    fullWidth: true,
                    chartPadding: {
                        right: 40,
                    },
                    lineSmooth: true,
                    low: 0,
                }
            )
        }

        if (dashboardData?.categoryStats && pieChartRef.current) {
            new PieChart(
                pieChartRef.current,
                {
                    labels: dashboardData.categoryStats.map(
                        (item) => item.name
                    ),
                    series: dashboardData.categoryStats.map(
                        (item) => item.totalSales
                    ),
                },
                {
                    donut: true,
                    donutWidth: 60,
                    startAngle: 270,
                }
            )
        }
    }, [dashboardData])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spin size="large" />
            </div>
        )
    }

    const { stats, recentOrders, topProducts } = dashboardData || {}

    // Add custom styles for Chartist
    const chartStyles = `
        .ct-series-a .ct-line {
            stroke: #1890ff;
            stroke-width: 2px;
        }
        .ct-series-a .ct-area {
            fill: #1890ff;
            fill-opacity: 0.1;
        }
        .ct-series-a .ct-point {
            stroke: #1890ff;
            stroke-width: 6px;
        }
        .ct-series-a .ct-slice-donut {
            stroke: #1890ff;
        }
        .ct-series-b .ct-slice-donut {
            stroke: #52c41a;
        }
        .ct-series-c .ct-slice-donut {
            stroke: #faad14;
        }
        .ct-series-d .ct-slice-donut {
            stroke: #722ed1;
        }
    `

    // Table columns configuration
    const orderColumns = [
        { title: 'Order ID', dataIndex: '_id', key: '_id' },
        {
            title: 'Customer',
            dataIndex: 'user',
            key: 'user',
            render: (user: any) => user.name,
        },
        {
            title: 'Amount',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (amount: number) => `$${amount.toFixed(2)}`,
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
    ]

    return (
        <div className="p-6 space-y-6">
            <style>{chartStyles}</style>

            {/* Stats Cards */}
            <Row gutter={[16, 16]}>
                {[
                    {
                        title: 'Total Orders',
                        value: stats?.totalOrders,
                        icon: <ShoppingOutlined />,
                        color: 'blue',
                    },
                    {
                        title: 'Total Users',
                        value: stats?.totalUsers,
                        icon: <UserOutlined />,
                        color: 'green',
                    },
                    {
                        title: 'Total Products',
                        value: stats?.totalProducts,
                        icon: <BookOutlined />,
                        color: 'purple',
                    },
                    {
                        title: 'Total Revenue',
                        value: stats?.totalRevenue,
                        prefix: '$',
                        icon: <DollarOutlined />,
                        color: 'orange',
                    },
                ].map((stat, index) => (
                    <Col xs={24} sm={12} md={6} key={stat.title}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full">
                                <Statistic
                                    title={
                                        <span className="flex items-center gap-2">
                                            {stat.icon}
                                            {stat.title}
                                        </span>
                                    }
                                    value={stat.value}
                                    prefix={stat.prefix}
                                    valueStyle={{
                                        color: `var(--ant-${stat.color}-6)`,
                                    }}
                                />
                            </Card>
                        </motion.div>
                    </Col>
                ))}
            </Row>

            {/* Charts */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <Card title="Sales Overview">
                        <div
                            ref={lineChartRef}
                            className="ct-chart h-[300px]"
                        />
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title="Category Distribution">
                        <div ref={pieChartRef} className="ct-chart h-[300px]" />
                    </Card>
                </Col>
            </Row>

            {/* Recent Orders & Top Products */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <Card title="Recent Orders">
                        <Table
                            dataSource={recentOrders}
                            columns={orderColumns}
                            pagination={false}
                            rowKey="_id"
                        />
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title="Top Products">
                        {topProducts?.map((product: any, index: number) => (
                            <div key={product._id} className="mb-4">
                                <div className="flex justify-between mb-2">
                                    <span>{product.name}</span>
                                    <span>${product.price}</span>
                                </div>
                                <Progress
                                    percent={Math.round(
                                        (product.soldCount / 100) * 100
                                    )}
                                    strokeColor={`var(--ant-${
                                        [
                                            'blue',
                                            'green',
                                            'orange',
                                            'purple',
                                            'red',
                                        ][index]
                                    }-6)`}
                                />
                            </div>
                        ))}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default AdminDashboard
