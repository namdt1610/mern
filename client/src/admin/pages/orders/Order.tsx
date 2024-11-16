import React from 'react'
import { Table, Button, Space } from 'antd/lib'
import { ColumnsType } from 'antd/es/table'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../../contexts/UserContext'
import { User } from '../../../interfaces/User'
import { Order } from '../../../interfaces/Order'

const Order: React.FC = () => {
    const { state, dispatch } = useContext(UserContext)

    useEffect(() => {
        // Fetch orders and dispatch SET_USERS action
        // Example: dispatch({ type: 'SET_USERS', payload: fetchedOrders });
    }, [dispatch])

    const columns: ColumnsType<User> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Total', dataIndex: 'total', key: 'total' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary">Edit</Button>
                    <Button color="danger">Delete</Button>
                </Space>
            ),
        },
    ]

    return (
        <div>
            <h1>Orders</h1>
            <Table columns={columns} dataSource={state.users} rowKey="_id" />
        </div>
    )
}

export default Order
