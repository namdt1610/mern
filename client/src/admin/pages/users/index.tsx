import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'
import useUserActions from '../../../hooks/useUserActions'

interface User {
    _id: string
    key: string
    avatar: string
    name: string
    role: string
    email: string
    phone: string
    address: string
}

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
                    src={avatar}
                    alt="Avatar"
                    style={{ width: 40, height: 40, borderRadius: '50%' }}
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
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div>
                    <button onClick={() => handleView(record._id)}>Xem</button>
                    <button onClick={() => handleDelete(record.key)}>
                        Xóa
                    </button>
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

    return <Table dataSource={users} columns={columns} />
}
