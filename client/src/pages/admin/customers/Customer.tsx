import React, { useState } from 'react'
import {
    Button,
    Input,
    message,
    Popconfirm,
    Space,
    Table,
    Typography,
} from 'antd'
import { useNavigate } from 'react-router-dom'
import {
    useDeleteCustomerMutation,
    useGetCustomersQuery,
} from '@/services/CustomerApi' // Sửa thành đường dẫn API của bạn
import { Customer } from '@/types/Customer' // Định nghĩa kiểu dữ liệu Customer

const { Title } = Typography
const { Search } = Input

const CustomerPage: React.FC = () => {
    const navigate = useNavigate()

    // Lấy danh sách khách hàng từ API
    const {
        data: customers,
        isLoading,
        isError,
        refetch,
    } = useGetCustomersQuery()

    // Mutation để xóa khách hàng
    const [deleteCustomer] = useDeleteCustomerMutation()

    // Trạng thái tìm kiếm
    const [searchValue, setSearchValue] = useState<string>('')

    const handleSearch = (value: string) => {
        setSearchValue(value.toLowerCase())
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteCustomer(id).unwrap()
            message.success('Customer deleted successfully')
            refetch() // Refetch dữ liệu sau khi xóa
        } catch (error) {
            message.error('Failed to delete customer')
        }
    }

    // Lọc danh sách khách hàng dựa trên tìm kiếm
    const filteredCustomers = customers?.filter((customer) =>
        customer.name.toLowerCase().includes(searchValue)
    )

    // Cột trong bảng
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: Customer, b: Customer) => a.name.localeCompare(b.name),
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
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Customer) => (
                <Space size="middle">
                    <Button
                        type="link"
                        onClick={() => navigate(`/customers/${record._id}`)}
                    >
                        Details
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this customer?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    if (isLoading) {
        return <p>Loading customers...</p>
    }

    if (isError) {
        return (
            <p>
                Failed to load customers.{' '}
                <Button onClick={refetch}>Retry</Button>
            </p>
        )
    }

    return (
        <div>
            <Title level={3}>Customer Management</Title>
            <Space style={{ marginBottom: 16 }}>
                <Search
                    placeholder="Search by name"
                    onSearch={handleSearch}
                    style={{ width: 200 }}
                />
                <Button
                    type="primary"
                    onClick={() => navigate('/customers/new')}
                >
                    Add Customer
                </Button>
            </Space>
            <Table
                dataSource={filteredCustomers}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    )
}

export default CustomerPage
