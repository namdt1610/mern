import React from 'react';
import {Card, Col, Row, Statistic, Table} from 'antd';
import {useGetOrdersQuery} from 'services/OrderApi';
import {CheckCircleOutlined, ClockCircleOutlined, DollarOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import LoadingError from 'components/LoadingError';

export default function OrderReports() {
      const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();

      if (isLoading || error) {
            return <LoadingError isLoading={isLoading} error={error} refetch={refetch} />;
      }

      // Calculate statistics
      const totalOrders = orders?.length || 0;
      const totalRevenue = orders?.reduce((sum, order) => sum + order.totalPrice, 0) || 0;
      const paidOrders = orders?.filter(order => order.isPaid).length || 0;
      const pendingOrders = orders?.filter(order => !order.isDelivered).length || 0;

      // Prepare monthly revenue data
      const monthlyRevenue = orders?.reduce((acc: any, order) => {
            const date = new Date(order.createdAt);
            const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
            acc[monthYear] = (acc[monthYear] || 0) + order.totalPrice;
            return acc;
      }, {});

      const revenueData = Object.entries(monthlyRevenue || {}).map(([month, revenue]) => ({
            month,
            revenue,
      }));

      const columns = [
            {
                  title: 'Month',
                  dataIndex: 'month',
                  key: 'month',
            },
            {
                  title: 'Revenue',
                  dataIndex: 'revenue',
                  key: 'revenue',
                  render: (revenue: number) => `$${revenue.toFixed(2)}`,
            },
      ];

      return (
            <>
                  <Row gutter={16} className="mb-6">
                        <Col span={6}>
                              <Card>
                                    <Statistic
                                          title="Total Orders"
                                          value={totalOrders}
                                          prefix={<ShoppingCartOutlined />}
                                    />
                              </Card>
                        </Col>
                        <Col span={6}>
                              <Card>
                                    <Statistic
                                          title="Total Revenue"
                                          value={totalRevenue}
                                          prefix={<DollarOutlined />}
                                          precision={2}
                                    />
                              </Card>
                        </Col>
                        <Col span={6}>
                              <Card>
                                    <Statistic
                                          title="Paid Orders"
                                          value={paidOrders}
                                          prefix={<CheckCircleOutlined />}
                                    />
                              </Card>
                        </Col>
                        <Col span={6}>
                              <Card>
                                    <Statistic
                                          title="Pending Orders"
                                          value={pendingOrders}
                                          prefix={<ClockCircleOutlined />}
                                    />
                              </Card>
                        </Col>
                  </Row>

                  <Card title="Monthly Revenue" className="card-border">
                        <Table
                              dataSource={revenueData}
                              columns={columns}
                              rowKey="month"
                              pagination={false}
                        />
                  </Card>
            </>
      );
}