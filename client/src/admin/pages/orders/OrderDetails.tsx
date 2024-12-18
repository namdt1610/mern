import React from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {Badge, Button, Card, Descriptions, Space, Table} from 'antd'
import {useGetOrderByIdQuery} from '@/services/OrderApi'
import LoadingError from '@/components/LoadingError'
import {ArrowLeftOutlined} from '@ant-design/icons'

export default function OrderDetails() {
      const { id } = useParams()
      const navigate = useNavigate()
      const { data: order, isLoading, error, refetch } = useGetOrderByIdQuery(id!)

      const columns = [
            {
                  title: 'Product',
                  dataIndex: 'name',
                  key: 'name',
            },
            {
                  title: 'Quantity',
                  dataIndex: 'quantity',
                  key: 'quantity',
            },
            {
                  title: 'Price',
                  dataIndex: 'price',
                  key: 'price',
                  render: (price: number) => `$${price.toFixed(2)}`,
            },
            {
                  title: 'Total',
                  key: 'total',
                  render: (_, record: any) =>
                        `$${(record.price * record.quantity).toFixed(2)}`,
            },
      ]

      if (isLoading || error) {
            return <LoadingError isLoading={isLoading} error={error} refetch={refetch} />
      }

      return (
            <>
                  <Card className="my-6 card-border">
                        <Space>
                              <Button
                                    icon={<ArrowLeftOutlined />}
                                    onClick={() => navigate('/admin/orders')}
                              >
                                    Back to Orders
                              </Button>
                        </Space>
                  </Card>

                  <Card title="Order Details" className="card-border">
                        <Descriptions bordered column={2}>
                              <Descriptions.Item label="Order ID">{order?._id}</Descriptions.Item>
                              <Descriptions.Item label="Customer Name">
                                    {order?.customerName}
                              </Descriptions.Item>
                              <Descriptions.Item label="Order Date">
                                    {new Date(order?.createdAt).toLocaleString()}
                              </Descriptions.Item>
                              <Descriptions.Item label="Status">
                                    <Badge
                                          status="processing"
                                          color={order?.status === 'completed' ? 'green' : 'red'}
                                          text={order?.status}
                                    />
                              </Descriptions.Item>
                              <Descriptions.Item label="Shipping Address">
                                    {order?.shippingAddress}
                              </Descriptions.Item>
                              <Descriptions.Item label="Total Amount">
                                    ${order?.totalAmount.toFixed(2)}
                              </Descriptions.Item>
                        </Descriptions>

                        <h3 className="mt-6 mb-4 text-lg font-semibold">Order Items</h3>
                        <Table
                              dataSource={order?.items}
                              columns={columns}
                              rowKey="id"
                              pagination={false}
                              className="border-black border rounded-lg"
                        />
                  </Card>
            </>
      )
}