import React from 'react'
import { Table, Card, Tag, Space, DatePicker } from 'antd'
import { useGetStockActivityQuery } from '@/services/InventoryApi'
import type { RangePickerProps } from 'antd/es/date-picker'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker

const InventoryActivity: React.FC = () => {
    const [dateRange, setDateRange] = React.useState<[Date, Date] | null>(null)
    const { data: activities, isLoading } = useGetStockActivityQuery(
        dateRange || undefined
    )

    const handleDateRangeChange: RangePickerProps['onChange'] = (dates) => {
        if (dates) {
            setDateRange([dates[0]?.toDate()!, dates[1]?.toDate()!])
        } else {
            setDateRange(null)
        }
    }

    const columns = [
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => {
                return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
            },
            sorter: (a: any, b: any) => {
                return dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix()
            },
        },
        {
            title: 'Product',
            dataIndex: ['product', 'name'],
            key: 'product',
            sorter: (a: any, b: any) =>
                a.product.name.localeCompare(b.product.name),
        },
        {
            title: 'SKU',
            dataIndex: ['product', 'sku'],
            key: 'sku',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (action: string) => (
                <Tag
                    color={
                        action === 'add'
                            ? 'green'
                            : action === 'remove'
                            ? 'red'
                            : 'blue'
                    }
                >
                    {action.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity: number, record: any) => (
                <span
                    style={{
                        color:
                            record.action === 'add'
                                ? 'green'
                                : record.action === 'remove'
                                ? 'red'
                                : 'inherit',
                    }}
                >
                    {record.action === 'remove' ? '-' : '+'}
                    {quantity}
                </span>
            ),
        },
        {
            title: 'Previous Stock',
            dataIndex: 'previousQuantity',
            key: 'previousQuantity',
        },
        {
            title: 'New Stock',
            dataIndex: 'newQuantity',
            key: 'newQuantity',
        },
        {
            title: 'Updated By',
            dataIndex: 'updatedBy',
            key: 'updatedBy',
        },
    ]

    return (
        <div className="p-6">
            <Card className="shadow-md">
                <Space direction="vertical" style={{ width: '100%' }}>
                    <div className="flex justify-end mb-4">
                        <RangePicker
                            onChange={handleDateRangeChange}
                            allowClear
                            placeholder={['Start Date', 'End Date']}
                        />
                    </div>
                    <Table
                        columns={columns}
                        dataSource={activities}
                        loading={isLoading}
                        rowKey="_id"
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showTotal: (total) => `Total ${total} activities`,
                        }}
                    />
                </Space>
            </Card>
        </div>
    )
}

export default InventoryActivity
