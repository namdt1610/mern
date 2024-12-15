import React from 'react'
import {Table, Tag} from 'antd/'

const RecentActivityTable: React.FC = () => {
    const columns = [
        { title: 'Hành động', dataIndex: 'action', key: 'action' },
        { title: 'Thời gian', dataIndex: 'time', key: 'time' },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === 'Thành công' ? 'green' : 'red'}>
                    {status}
                </Tag>
            ),
        },
    ]

    const data = [
        {
            key: '1',
            action: 'Đăng nhập',
            time: '10:00 AM',
            status: 'Thành công',
        },
        {
            key: '2',
            action: 'Tạo đơn hàng',
            time: '10:15 AM',
            status: 'Thất bại',
        },
        {
            key: '3',
            action: 'Đăng xuất',
            time: '10:30 AM',
            status: 'Thành công',
        },
    ]

    return <Table columns={columns} dataSource={data} pagination={false} />
}

export default RecentActivityTable
