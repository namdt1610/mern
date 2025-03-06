import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import {
    Table,
    Button,
    Space,
    Card,
    message,
    Tooltip,
    Input,
    Tag,
    Result,
} from 'antd'
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    EyeOutlined,
} from '@ant-design/icons'
import {
    useGetWarehousesQuery,
    useDeleteWarehouseMutation,
} from '@/services/WarehouseApi'
import { usePermissions } from '@/hooks/usePermissions'
import adminRoutes from '@/routes/admin/routesConfig'
import { IWarehouse } from '@/types/IWarehouse'

const WarehousesPage: React.FC = () => {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('')
    const { data: warehouses, isLoading } = useGetWarehousesQuery()
    const [deleteWarehouse] = useDeleteWarehouseMutation()
    const { canView, canEdit, canDelete } = usePermissions(
        adminRoutes.children?.find((route) => route.path === 'warehouses')
            ?.permissions
    )

    console.log('warehouses', warehouses)
    // console.log(canView, canEdit, canDelete)

    const handleDelete = async (id: string) => {
        try {
            await deleteWarehouse(id).unwrap()
            message.success('warehouses item deleted successfully')
        } catch (error: any) {
            message.error(
                error?.data?.message || 'Failed to delete warehouses item'
            )
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filterable: true,
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            filterable: true,
            sorter: (a: any, b: any) => a.location.localeCompare(b.location),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a: any, b: any) => a.description - b.description,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: any) => (
                <Space>
                    {canEdit && (
                        <Tooltip title="Edit">
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() =>
                                    navigate(`/admin/warehouses/${record._id}`)
                                }
                            />
                        </Tooltip>
                    )}
                    {canDelete && (
                        <Tooltip title="Delete">
                            <Button
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDelete(record._id)}
                            />
                        </Tooltip>
                    )}
                    {!canEdit && !canDelete && (
                        <Tooltip title="View">
                            <Button
                                icon={<EyeOutlined />}
                                onClick={() =>
                                    navigate(`/admin/warehouses/${record._id}`)
                                }
                            />
                        </Tooltip>
                    )}
                </Space>
            ),
        },
    ]

    const filteredData = warehouses?.filter((item: IWarehouse) => {
        if (!item?.name || !item?._id) return false

        const searchContent = searchText.toLowerCase()
        return (
            item._id.toLowerCase().includes(searchContent) ||
            item.name.toLowerCase().includes(searchContent) ||
            item.location.toLowerCase().includes(searchContent)
        )
    })

    if (!canView) {
        return (
            <>
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page. Please login with an authorized account."
                />
            </>
        )
    }

    return (
        <div className="p-6">
            <Card className="shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <Space>
                        <Input
                            placeholder="Search by location or name"
                            prefix={<SearchOutlined />}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{ width: 300 }}
                        />
                    </Space>
                    <Space>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() =>
                                navigate('/admin/warehouses/stock-in-out')
                            }
                        >
                            Add New Warehouse
                        </Button>
                    </Space>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    loading={isLoading}
                    rowKey={(record) => record._id}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} items`,
                    }}
                />
            </Card>
        </div>
    )
}

export default WarehousesPage
