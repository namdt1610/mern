import React from 'react'
import {Card, Col, Row, Statistic} from 'antd/'

const DashboardStats: React.FC = () => {
    const stats = [
        { title: 'Người dùng', value: 1200 },
        { title: 'Đơn hàng', value: 530 },
        { title: 'Doanh thu', value: '15,000$', precision: 2 },
    ]

    return (
        <Row gutter={[16, 16]}>
            {stats.map((stat, index) => (
                <Col span={8} key={index}>
                    <Card>
                        <Statistic
                            title={stat.title}
                            value={stat.value}
                            precision={stat.precision}
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default DashboardStats
