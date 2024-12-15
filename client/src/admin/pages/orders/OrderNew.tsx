import React from 'react';
import {Button, Card, Form, Input, InputNumber, Space} from 'antd';
import {Order} from 'types/Order';

const OrderNewForm: React.FC = () => {
      const [form] = Form.useForm();

      const onFinish = (values: Partial<Order>) => {
            console.log('Received values:', values);
            // Handle form submission here
      };

      return (
            <Card title="Create New Order">
                  <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                              orderItems: [{ name: '', quantity: 1, price: 0 }],
                              isPaid: false,
                              isDelivered: false,
                        }}
                  >
                        {/* Customer Information */}
                        <Form.Item name="userPhone" label="User Phone Number" rules={[{ required: true }]}>
                              <Input />
                        </Form.Item>

                        {/* Shipping Address */}
                        <Card type="inner" title="Shipping Address">
                              <Form.Item name={['shippingAddress', 'address']} label="Address" rules={[{ required: true }]}>
                                    <Input />
                              </Form.Item>
                              <Form.Item name={['shippingAddress', 'city']} label="City" rules={[{ required: true }]}>
                                    <Input />
                              </Form.Item>
                              <Form.Item name={['shippingAddress', 'postalCode']} label="Postal Code" rules={[{ required: true }]}>
                                    <Input />
                              </Form.Item>
                              <Form.Item name={['shippingAddress', 'country']} label="Country" rules={[{ required: true }]}>
                                    <Input />
                              </Form.Item>
                        </Card>

                        {/* Payment Information */}
                        <Form.Item name="paymentMethod" label="Payment Method" rules={[{ required: true }]}>
                              <Input />
                        </Form.Item>

                        {/* Price Information */}
                        <Space size="large">
                              <Form.Item name="itemsPrice" label="Items Price" rules={[{ required: true }]}>
                                    <InputNumber min={0} precision={2} />
                              </Form.Item>
                              <Form.Item name="taxPrice" label="Tax" rules={[{ required: true }]}>
                                    <InputNumber min={0} precision={2} />
                              </Form.Item>
                              <Form.Item name="shippingPrice" label="Shipping Price" rules={[{ required: true }]}>
                                    <InputNumber min={0} precision={2} />
                              </Form.Item>
                              <Form.Item name="totalPrice" label="Total Price" rules={[{ required: true }]}>
                                    <InputNumber min={0} precision={2} />
                              </Form.Item>
                        </Space>

                        {/* Submit Button */}
                        <Form.Item>
                              <Button type="primary" htmlType="submit">
                                    Create Order
                              </Button>
                        </Form.Item>
                  </Form>
            </Card>
      );
};

export default OrderNewForm;