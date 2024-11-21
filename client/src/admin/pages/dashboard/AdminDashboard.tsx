import React from 'react'
import { Row, Col } from 'antd/'
import DashboardStats from './DashboardStats'
import DashboardChart from './DashboardChart'
import RecentActivityTable from './RecentActivityTable'

const AdminDashboard: React.FC = () => {
    return (
        <div style={{ padding: 16 }}>
            <h1 style={{ marginBottom: 16 }}>Dashboard</h1>
            <DashboardStats />
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col span={16}>
                    <DashboardChart />
                </Col>
                <Col span={8}>
                    <RecentActivityTable />
                </Col>
            </Row>
        </div>
    )
}

export default AdminDashboard
