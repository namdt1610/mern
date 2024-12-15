import React from 'react'
import {Card, Descriptions} from 'antd'
import {Order} from 'types/Order'

interface OrderDetailsFormProps {
      order: Order
}

export default function OrderDetailsForm({ order }: OrderDetailsFormProps) {
      return (
            <Card title="Order Information" className="mt-6 card-border">
                  <Descriptions bordered column={1}>
                        <Descriptions.Item label="Payment Method">
                              {order.paymentMethod}
                        </Descriptions.Item>
                        
                        {order.paymentResult && (
                              <>
                                    <Descriptions.Item label="Payment ID">
                                          {order.paymentResult.id}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Payment Status">
                                          {order.paymentResult.status}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Payment Email">
                                          {order.paymentResult.email_address}
                                    </Descriptions.Item>
                              </>
                        )}

                        <Descriptions.Item label="Shipping Address">
                              {`${order.shippingAddress.address}, 
                                ${order.shippingAddress.city}, 
                                ${order.shippingAddress.postalCode}, 
                                ${order.shippingAddress.country}`}
                        </Descriptions.Item>

                        <Descriptions.Item label="Items Price">
                              ${order.itemsPrice.toFixed(2)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tax">
                              ${order.taxPrice.toFixed(2)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Shipping">
                              ${order.shippingPrice.toFixed(2)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Total">
                              ${order.totalPrice.toFixed(2)}
                        </Descriptions.Item>
                  </Descriptions>
            </Card>
      )
}