import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { User } from '@/types/User'
import { debounce } from 'lodash'
import { useNavigate, Link } from 'react-router-dom'
import {
    Button,
    Space,
    Badge,
    Input,
    Table,
    Modal,
    Card,
    message,
} from 'antd/lib'
import { ColumnsType } from 'antd/lib/table'
import { ReloadOutlined, PlusOutlined, ImportOutlined } from '@ant-design/icons'
import { useGetUsersQuery, useDeleteUserMutation } from '@/services/UserApi'
import LoadingError from 'components/LoadingError'

export default function Users() {
    // Interface cho record
    interface ActionRecord extends User {
        _id: string
    }

    const navigate = useNavigate()
    const [deleteUser] = useDeleteUserMutation()
    const [filteredData, setFilteredData] = useState<User[]>([])
    const { data: users, error, isLoading, refetch } = useGetUsersQuery()

    // Lọc dữ liệu
    useEffect(() => {
        if (users) setFilteredData(users)
    }, [users])

    // Tìm kiếm
    const onSearch = useMemo(() => {
        return debounce((value: string) => {
            const lowercasedValue = value.toLowerCase()
            const filtered = users?.filter((user) =>
                ['name', 'email', 'phone', 'status'].some((key) =>
                    user[key]?.toLowerCase()?.includes(lowercasedValue)
                )
            )
            setFilteredData(filtered ?? [])
        }, 300)
    }, [users])

    // Render actions dùng useCallback vì truyền vào Table
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

    // Dùng useMemo để tránh re-render vì columns là danh sách tĩnh
    //(nếu không dùng useMemo thì mỗi lần re - render Users thì columns sẽ được tạo mới)
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
                                ? `http://localhost:8888${avatar}`
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

    // Xóa user
    const handleDelete = (userId: string) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'Do you really want to delete this user?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: async () => {
                deleteUser(userId)
                    .then(() => {
                        message.success('User deleted successfully!')
                    })
                    .catch((error) => {
                        const errorMessage =
                            error?.data?.message || 'Failed to delete user!'
                        message.error(errorMessage)
                        console.error('Delete error:', error)
                    })
            },
        })
    }

    const handleRefresh = () => {
        refetch()
        setFilteredData(users) // Hoặc gọi lại API tùy nhu cầu
    }

    const handleView = (id: string) => {
        navigate(`/admin/users/${id}`)
    }

    const { Search } = Input

    // Xử lý loading và error
    if (isLoading || error) {
        return (
            <LoadingError
                isLoading={isLoading}
                error={error}
                refetch={refetch}
            />
        )
    }

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
                        onClick={() => handleRefresh()}
                        icon={<ReloadOutlined />}
                    >
                        Refresh
                    </Button>
                    <Search
                        size="large"
                        placeholder="input search text"
                        allowClear
                        enterButton="Search"
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
                    rowKey={(record) => record._id}
                    size="large"
                    tableLayout="fixed"
                    rowClassName={'cursor-pointer'}
                    className="border-black border rounded-lg"
                    dataSource={filteredData}
                    columns={columns}
                    locale={{
                        emptyText: !users
                            ? 'Đang tải dữ liệu...'
                            : filteredData.length === 0
                            ? 'Không có từ khóa trùng khớp'
                            : 'Không có dữ liệu',
                    }}
                />
            </Card>
        </>
    )
}
