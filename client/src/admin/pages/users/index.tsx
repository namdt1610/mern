import React, { useEffect, useState } from 'react'
import Table from 'antd/lib/table'
import { ColumnsType } from 'antd/lib/table'
import { useNavigate } from 'react-router-dom'
import useUserActions from '../../../hooks/useUserActions'
import { User } from '../../../interfaces/user.interface'
import { Button, Space, Badge } from 'antd/lib'

export default function Users() {
    const { fetchUsers } = useUserActions()
    const navigate = useNavigate()
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const getUsers = async () => {
            const data = await fetchUsers()
            setUsers(data.map((user: User) => ({ ...user, key: user._id }))) // Đảm bảo có trường `key`
        }

        getUsers()
    }, [])

    const columns: ColumnsType<User> = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => (
                <img
                    src={`http://localhost:8888/${avatar}`}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full object-cover"
                />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
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
                ></Badge>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div>
                    <Space>
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => handleView(record._id)}
                        >
                            Xem
                        </Button>
                        <Button
                            color="danger"
                            variant="outlined"
                            onClick={() => handleDelete(record._id)}
                        >
                            Xóa
                        </Button>
                    </Space>
                </div>
            ),
        },
    ]

    const handleView = (id: string) => {
        navigate(`/admin/users/${id}`)
    }

    const handleDelete = (userId: string) => {
        console.log('Delete user ID:', userId)
    }

    return (
        <>
            <div className="my-4">
                <Space>
                    <Button>New</Button>
                    <Button>Import</Button>
                </Space>
            </div>
                <Table dataSource={users} columns={columns} />
        </>
    )
}
