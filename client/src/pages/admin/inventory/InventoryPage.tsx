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
    useGetAllStockQuery as useGetInventoryQuery,
    useRemoveStockMutation,
} from '@/services/InventoryApi'
import { usePermissions } from '@/hooks/usePermissions'
import adminRoutes from '@/routes/admin/routesConfig'
import { IInventory } from '@/types/IInventory'

const InventoryPage: React.FC = () => {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('')
    const { data: inventory, isLoading } = useGetInventoryQuery()
    const [deleteStock] = useRemoveStockMutation()
    const { canView, canEdit, canDelete } = usePermissions(
        adminRoutes.children?.find((route) => route.path === 'inventory')
            ?.permissions
    )

    console.log('inventory', inventory)
    // console.log(canView, canEdit, canDelete)

    const handleDelete = async (_id: string, quantity: number) => {
        try {
            await deleteStock({ productId: _id, quantity: quantity }).unwrap()
            message.success('Inventory item deleted successfully')
        } catch (error: any) {
            message.error(
                error?.data?.message || 'Failed to delete inventory item'
            )
        }
    }

    const columns = [
        {
            title: 'SKU',
            dataIndex: ['product', 'sku'],
            key: 'sku',
            sorter: (a: any, b: any) =>
                a.product.sku.localeCompare(b.product.sku),
        },
        {
            title: 'Warehouse',
            dataIndex: ['warehouse', 'name'],
            key: 'warehouse',
            sorter: (a: any, b: any) =>
                a.warehouse.name.localeCompare(b.warehouse.name),
        },
        {
            title: 'Product Name',
            dataIndex: ['product', 'name'],
            key: 'name',
            filterable: true,
            sorter: (a: any, b: any) =>
                a.product.name.localeCompare(b.product.name),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a: any, b: any) => a.quantity - b.quantity,
            render: (quantity: number) => (
                <Tag color={quantity > 0 ? 'green' : 'red'}>{quantity}</Tag>
            ),
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
                                    navigate(
                                        `/admin/inventory/${record.product._id}`
                                    )
                                }
                            />
                        </Tooltip>
                    )}
                    {canDelete && (
                        <Tooltip title="Delete">
                            <Button
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() =>
                                    handleDelete(
                                        record.product._id,
                                        record.quantity
                                    )
                                }
                            />
                        </Tooltip>
                    )}
                    {!canEdit && !canDelete && (
                        <Tooltip title="View">
                            <Button
                                icon={<EyeOutlined />}
                                onClick={() =>
                                    navigate(
                                        `/admin/inventory/${record.product._id}`
                                    )
                                }
                            />
                        </Tooltip>
                    )}
                </Space>
            ),
        },
    ]

    const filteredData = inventory?.filter((item: IInventory) => {
        if (!item?.product?.name || !item?.product?._id) return false

        const searchContent = searchText.toLowerCase()
        return (
            item.product._id.toLowerCase().includes(searchContent) ||
            item.product.name.toLowerCase().includes(searchContent)
        )
    })
    console.log('filteredData', filteredData)

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
                            placeholder="Search by SKU or name"
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
                                navigate('/admin/inventory/stock-in-out')
                            }
                        >
                            Import Stock
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

export default InventoryPage
