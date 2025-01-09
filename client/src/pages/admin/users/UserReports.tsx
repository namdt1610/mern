import React, { useMemo, useState } from 'react'
import { Badge, Button, Card, Col, Row, Statistic, Table } from 'antd'
import { Pie } from 'react-chartjs-2'
import { Link } from 'react-router-dom'
import { useGetUsersQuery } from '@/services/UserApi'
import dayjs from 'dayjs'
import 'chart.js/auto'
import { ColumnsType } from 'antd/lib/table'
import { User } from 'shared/types/User'

const UserReport: React.FC = () => {
    const { data: users, error, isLoading } = useGetUsersQuery()
    const [filteredData, setFilteredData] = useState<User[]>(users || [])

    const totalUsers = useMemo(() => users?.length || 0, [users])
    const activeUsers = useMemo(
        () => users?.filter((user) => user.status === 'active').length || 0,
        [users]
    )
    const inactiveUsers = useMemo(
        () => users?.filter((user) => user.status === 'inactive').length || 0,
        [users]
    )

    const chartData = {
        labels: ['Active', 'Inactive'],
        datasets: [
            {
                label: 'Users by Status',
                data: [activeUsers, inactiveUsers],
                backgroundColor: ['#4caf50', '#f44336'], // Green for active, red for inactive
                hoverOffset: 4,
            },
        ],
    }

    const columns: ColumnsType<User> = useMemo(
        () => [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (name, user) => (
                    <Link to={`/admin/users/${user._id}`}>{name}</Link>
                ),
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (status) => (
                    <Badge
                        className="capitalize"
                        status="processing"
                        color={status === 'active' ? 'green' : 'red'}
                        text={status}
                    />
                ),
            },
            {
                title: 'Joined',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (date) => dayjs(date).format('YYYY-MM-DD'),
            },
        ],
        []
    )

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error loading user data</div>
    }

    return (
        <Card className="my-6 card-border">
            <Row gutter={16}>
                <Col span={8}>
                    <Statistic
                        title="Total Users"
                        value={totalUsers}
                        suffix="people"
                    />
                </Col>
                <Col span={8}>
                    <Statistic
                        title="Active Users"
                        value={activeUsers}
                        suffix="people"
                    />
                </Col>
                <Col span={8}>
                    <Statistic
                        title="Inactive Users"
                        value={inactiveUsers}
                        suffix="people"
                    />
                </Col>
            </Row>
            <Row gutter={16} className="mt-4">
                <Col span={24}>
                    <Card title="User Status Distribution">
                        <Pie
                            data={chartData}
                            options={{
                                maintainAspectRatio: false,
                                responsive: true,
                            }}
                        />
                    </Card>
                </Col>
            </Row>
            <Table
                rowKey={(record) => record._id}
                size="large"
                dataSource={filteredData}
                columns={columns}
                locale={{
                    emptyText: 'No user data available',
                }}
            />
        </Card>
    )
}

export default UserReport
