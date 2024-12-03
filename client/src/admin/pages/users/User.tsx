import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { User } from '../../../interfaces/User'
import useUserActions from '../../../hooks/User/useUserActions'
import { Button, Space, Badge, Input, Table, Modal, Card } from 'antd/lib'
import { ColumnsType } from 'antd/lib/table'
import { ReloadOutlined, PlusOutlined, ImportOutlined } from '@ant-design/icons'
import { debounce } from 'lodash'
import { useGetUsersQuery } from 'services/User'

export default function Users() {
    const { fetchUsers } = useUserActions()
    const navigate = useNavigate()
    // const [users, setUsers] = useState<User[]>([])
    const [filteredData, setFilteredData] = useState<User[]>([])
    // Fetch danh sách users
    const { data: users, error, isLoading } = useGetUsersQuery()

    // const getUsers = async () => {
    //     const response = await fetchUsers()
    //     setUsers(response.map((user: User) => ({ ...user, key: user._id })))
    //     setFilteredData(response)
    // }

    // useEffect(() => {
    //     getUsers()
    // }, [])

    interface ActionRecord extends User {
        _id: string
    }

    const renderActions = useCallback(
        (_: unknown, record: ActionRecord): JSX.Element => (
            <Space size={'middle'} wrap>
                <Button
                    color="primary"
                    variant="outlined"
                    className="btn-border btn-hover"
                    onClick={() => handleView(record._id)}
                >
                    Xem
                </Button>
                <Button
                    color="danger"
                    variant="outlined"
                    className="btn-border btn-hover"
                    onClick={() => handleDelete(record._id)}
                >
                    Xóa
                </Button>
            </Space>
        ),
        []
    )

    const columns: ColumnsType<User> = useMemo(
        () => [
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
                        loading="lazy"
                    />
                ),
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => (a.name ?? '').localeCompare(b.name ?? ''),
                render: (_, { name, _id }) => (
                    <Link to={`/admin/users/${_id}`}>{name}</Link>
                ),
            },
            // {
            //     title: 'Role',
            //     dataIndex: 'role',
            //     key: 'role',
            //     render: (_, { role }) => {
            //         let color = role === 'admin' ? 'red' : 'green'
            //         return (
            //             <Tag color={color} key={role}>
            //                 {role.toUpperCase()}
            //             </Tag>
            //         )
            //     },
            //     sorter: (a, b) => a.role.localeCompare(b.role),
            // },
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
                render: renderActions,
            },
        ],
        []
    )

    const handleView = (id: string) => {
        navigate(`/admin/users/${id}`)
    }

    const handleDelete = (userId: string) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'Do you really want to delete this user?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                console.log('Delete user ID:', userId)
            },
        })
    }

    const onSearch = useMemo(
        () =>
            debounce((value: string) => {
                const lowercasedValue = value.toLowerCase()
                if (value === '') {
                    setFilteredData(users)
                } else {
                    const filtered = users.filter((user) =>
                        ['name', 'email', 'role', 'phone', 'status'].some(
                            (key) =>
                                user[key]
                                    ?.toLowerCase()
                                    .includes(lowercasedValue)
                        )
                    )
                    setFilteredData(filtered)
                }
            }, 300),
        [users]
    )

    const { Search } = Input

    return (
        <>
            <Card className="my-6 card-border">
                <Space size={'middle'} wrap>
                    <Link to={'/admin/register'}>
                        <Button
                            size="large"
                            className="btn-border btn-hover"
                            icon={<PlusOutlined />}
                        >
                            New
                        </Button>
                    </Link>
                    <Button
                        size="large"
                        className="btn-border btn-hover"
                        icon={<ImportOutlined />}
                    >
                        Import
                    </Button>
                    <Button
                        size="large"
                        className="btn-border btn-hover"
                        onClick={window.location.reload}
                        icon={<ReloadOutlined />}
                    >
                        Refresh
                    </Button>
                    <Search
                        size="large"
                        placeholder="input search text"
                        allowClear
                        onSearch={onSearch}
                        style={{ width: 'auto' }}
                    />
                </Space>
            </Card>
            <Card
                className="card-border"
                title={'User Management'}
                color="#f3f3f3"
            >
                <Table
                    size="large"
                    tableLayout="fixed"
                    rowClassName={'cursor-pointer'}
                    className="border-black border rounded-lg"
                    dataSource={filteredData}
                    columns={columns}
                    locale={{
                        emptyText:
                            filteredData.length === 0
                                ? 'Không có từ khóa trùng khớp'
                                : 'Không có dữ liệu',
                    }}
                />
            </Card>
        </>
    )
}
