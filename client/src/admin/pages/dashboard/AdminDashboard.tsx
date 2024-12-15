import React, {lazy, Suspense} from 'react'
import {Col, Row, Spin} from 'antd/'

const DashboardStats = lazy(() => import('./DashboardStats'))
const DashboardChart = lazy(() => import('./DashboardChart'))
const RecentActivityTable = lazy(() => import('./RecentActivityTable'))

const AdminDashboard: React.FC = () => {
    return (
        <div style={{ padding: 16 }}>
            <h1 style={{ marginBottom: 16 }}>Dashboard</h1>
            <Suspense
                fallback={
                    <div className="min-w-screen min-h-screen flex items-center justify-center">
                        <Spin size="large" />
                    </div>
                }
            >
                <DashboardStats />
            </Suspense>
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col span={16}>
                    <Suspense fallback={<Spin size="large" />}>
                        <DashboardChart />
                    </Suspense>
                </Col>
                <Col span={8}>
                    <Suspense fallback={<Spin size="large" />}>
                        <RecentActivityTable />
                    </Suspense>
                </Col>
            </Row>
        </div>
    )
}

export default AdminDashboard
