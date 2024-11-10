import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { User } from '../../../interfaces/user.interface'
import useUserActions from '../../../hooks/useUserActions'
import { Button, Space, Badge, Tag, Input, Table } from 'antd/lib'
import { ColumnsType, TableProps } from 'antd/lib/table'
import type { SearchProps } from 'antd/lib/input/'

export default function Users() {
    const { fetchUsers } = useUserActions()
    const navigate = useNavigate()
    const [users, setUsers] = useState<User[]>([])
    const [filteredData, setFilteredData] = useState<User[]>([])

    useEffect(() => {
        const getUsers = async () => {
            const data = await fetchUsers()
            setUsers(data.map((user: User) => ({ ...user, key: user._id })))
            // setFilteredData(
            //     data.map((user: User) => ({ ...user, key: user._id }))
            // )
            // console.log('Users:', data)
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
                    src={
                        avatar
                            ? `http://localhost:8888/${avatar}`
                            : '/img/meerkat.png'
                    }
                    alt="Avatar"
                    className="w-20 h-20 rounded-full object-cover"
                />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => (a.name ?? '').localeCompare(b.name ?? ''),
            render: (_, { name, _id }) => (
                <Link to={`/admin/users/${_id}`}>{name}</Link>
            ),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (_, { role }) => {
                let color = role === 'admin' ? 'red' : 'green'
                return (
                    <Tag color={color} key={role}>
                        {role.toUpperCase()}
                    </Tag>
                )
            },
            sorter: (a, b) => a.role.localeCompare(b.role),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            sorter: (a, b) => (a.phone ?? '').localeCompare(b.phone ?? ''),
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
            sorter: (a, b) => a.status.localeCompare(b.status),
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

    const onSearch: SearchProps['onSearch'] = (value) => {
        console.log('Search:', value)
        const lowercasedValue = value.toLowerCase()
        const filtered = users.filter(
            (user) =>
                user.name?.toLowerCase().includes(lowercasedValue) ||
                user.email?.toLowerCase().includes(lowercasedValue) ||
                user.role?.toLowerCase().includes(lowercasedValue) ||
                user.phone?.toLowerCase().includes(lowercasedValue) ||
                user.status?.toLowerCase().includes(lowercasedValue)
        )
        setFilteredData(filtered)
    }

    const { Search } = Input

    return (
        <>
            <div className="my-4">
                <Space>
                    <Button>New</Button>
                    <Button>Import</Button>
                    <Search
                        placeholder="input search text"
                        allowClear
                        onSearch={onSearch}
                        style={{ width: 200 }}
                    />
                </Space>
            </div>
            <Table
                dataSource={filteredData.length ? filteredData : users}
                columns={columns}
            />
        </>
    )
}
