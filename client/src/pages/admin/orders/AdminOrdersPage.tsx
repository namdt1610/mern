import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Order } from '@/types/Order' // Interface cho đơn hàng
import { debounce } from 'lodash'
import { useNavigate } from 'react-router-dom'
import { Badge, Button, Card, Input, message, Modal, Space, Table } from 'antd/'
import { ColumnsType } from 'antd/lib/table'
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons'
import { useDeleteOrderMutation, useGetOrdersQuery } from '@/services/OrderApi' // API của Orders
import LoadingError from '@/components/shared/LoadingError'

export default function Orders() {
    // Interface cho record đơn hàng
    interface ActionRecord extends Order {
        _id: string
    }

    const navigate = useNavigate()
    const [deleteOrder] = useDeleteOrderMutation()
    const [filteredData, setFilteredData] = useState<Order[]>([])
    const { data: orders, error, isLoading, refetch } = useGetOrdersQuery()

    // Lọc dữ liệu
    useEffect(() => {
        if (orders) setFilteredData(orders)
    }, [orders])

    // Tìm kiếm
    const onSearch = useMemo(() => {
        return debounce((value: string) => {
            const lowercasedValue = value.toLowerCase()
            const filtered = orders?.filter((order) =>
                ['_id', 'customerName', 'status'].some((key) =>
                    order[key as keyof Order]
                        ?.toString()
                        ?.toLowerCase()
                        ?.includes(lowercasedValue)
                )
            )
            setFilteredData(filtered ?? [])
        }, 300)
    }, [orders])

    // Render actions
    const renderActions = useCallback(
        (_: unknown, record: ActionRecord): JSX.Element => (
            <Space size={'middle'} wrap>
                <Button
                    color="primary"
                    variant="outlined"
                    className="btn-border btn-hover"
                    onClick={() => handleView(record._id)}
                >
                    View
                </Button>
                <Button
                    color="danger"
                    variant="outlined"
                    className="btn-border btn-hover"
                    onClick={() => handleDelete(record._id)}
                >
                    Delete
                </Button>
            </Space>
        ),
        []
    )

    // Cột dữ liệu
    const columns: ColumnsType<Order> = useMemo(
        () => [
            {
                title: 'Order ID',
                dataIndex: '_id',
                key: '_id',
                sorter: (a, b) => a._id.localeCompare(b._id),
            },
            {
                title: 'Customer Name',
                dataIndex: 'user',
                key: 'user',
                render: (user) => user.name,
                sorter: (a, b) => (a.user ?? '').localeCompare(b.user ?? ''),
            },
            {
                title: 'Total Price',
                dataIndex: 'totalPrice',
                key: 'totalPrice',
                render: (amount) => `$${amount}`,
                sorter: (a, b) => a.totalPrice - b.totalPrice,
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (status) => (
                    <Badge
                        className="capitalize"
                        status="processing"
                        color={status === 'completed' ? 'green' : 'red'}
                        text={status}
                    />
                ),
                sorter: (a, b) => Number(a.isPaid) - Number(b.isPaid),
            },
            {
                title: 'Order Date',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (date) => new Date(date).toLocaleDateString(),
                sorter: (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime(),
            },
            {
                title: 'Action',
                key: 'action',
                render: renderActions,
            },
        ],
        []
    )

    // Xóa đơn hàng
    const handleDelete = (_id: string) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'Do you really want to delete this order?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: async () => {
                deleteOrder(_id)
                    .then(() => {
                        message.success('Order deleted successfully!')
                    })
                    .catch((error) => {
                        const errorMessage =
                            error?.data?.message || 'Failed to delete order!'
                        message.error(errorMessage)
                        console.error('Delete error:', error)
                    })
            },
        })
    }

    const handleRefresh = () => {
        refetch()
        setFilteredData(orders ?? [])
    }

    const handleView = (id: string) => {
        navigate(`/admin/orders/${id}`)
    }

    const { Search } = Input

    // Xử lý loading và error
    if (isLoading || error) {
        return (
            <LoadingError
                isLoading={isLoading}
                isError={!!error}
                title="Loading..."
                isLogin={false}
                refetch={refetch}
            />
        )
    }

    return (
        <>
            <Card className="my-6 card-border">
                <Space size={'middle'} wrap>
                    <Button
                        size="large"
                        className="btn-border btn-hover"
                        onClick={() => handleRefresh()}
                        icon={<ReloadOutlined />}
                    >
                        Refresh
                    </Button>
                    <Search
                        size="large"
                        placeholder="Search orders"
                        allowClear
                        enterButton={<SearchOutlined />}
                        onSearch={onSearch}
                        style={{ width: 'auto' }}
                    />
                </Space>
            </Card>
            <Card
                className="card-border"
                title={'Order Management'}
                color="#f3f3f3"
            >
                <Table
                    rowKey={(record) => record._id}
                    size="large"
                    tableLayout="fixed"
                    rowClassName={'cursor-pointer'}
                    className="border-black border rounded-lg"
                    dataSource={filteredData}
                    columns={columns}
                    locale={{
                        emptyText: !orders
                            ? 'Loading data...'
                            : filteredData.length === 0
                            ? 'No matching records found'
                            : 'No data available',
                    }}
                />
            </Card>
        </>
    )
}
