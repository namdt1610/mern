import React, { Suspense, lazy } from 'react'
import { Row, Col, Card } from 'antd'

const LineChart = lazy(() => import('./components/LineChart'))
const PieChart = lazy(() => import('./components/PieChart'))

const AdminDashboard: React.FC = () => {
    return (
        <div className='py-4'>
            {/* Charts */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <Card title="Sales Overview">
                        <Suspense fallback={<div>Loading...</div>}>
                            <LineChart />
                        </Suspense>
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title="Category Distribution">
                        <Suspense fallback={<div>Loading...</div>}>
                            <PieChart />
                        </Suspense>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default AdminDashboard
