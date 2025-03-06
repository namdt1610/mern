import React, { useRef } from 'react'
import { Order } from '@/types/Order'
import { User } from '@shared/types/User'
import { Typography, Table, Divider, Modal, Button } from 'antd'
import dayjs from 'dayjs'
import { formatCurrency } from '@/utils/formatCurrency'
import { PrinterOutlined, EyeOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

interface PrintableOrderProps {
    order: Order
}

export default function PrintableOrder({ order }: PrintableOrderProps) {
    const [isPreviewVisible, setIsPreviewVisible] = React.useState(false)
    const printRef = useRef<HTMLDivElement>(null)

    const handlePrint = () => {
        window.print()
    }

    const columns = [
        {
            title: 'STT',
            key: 'index',
            width: 50,
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100,
            align: 'right' as const,
        },
        {
            title: 'Unit Price',
            dataIndex: 'price',
            key: 'price',
            width: 120,
            align: 'right' as const,
            render: (price: number) => formatCurrency(price),
        },
        {
            title: 'Amount',
            key: 'total',
            width: 120,
            align: 'right' as const,
            render: (_: any, record: any) =>
                formatCurrency(record.price * record.quantity),
        },
    ]

    const BillContent = () => (
        <div ref={printRef} className="p-8 max-w-4xl mx-auto bg-white">
            {/* Header */}
            <div className="text-center mb-8">
                <img
                    src="/img/DTN.webp"
                    alt="Logo"
                    className="w-32 mx-auto mb-4"
                />
                <Title level={2} className="!mb-1">
                    DTN STORE
                </Title>
                <Text className="block text-lg mb-1">
                    123 Example Street, City, Country
                </Text>
                <Text className="block mb-1">Phone: (123) 456-7890</Text>
                <Text className="block">Email: contact@dtnstore.com</Text>
            </div>

            <Divider className="!my-6 border-t-2" />

            {/* Invoice Title */}
            <div className="text-center mb-8">
                <Title level={2} className="!mb-2">
                    INVOICE
                </Title>
                <Title level={4} className="!m-0">
                    #{order._id}
                </Title>
            </div>

            {/* Order & Customer Info */}
            <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                    <Title level={5} className="!mb-2">
                        Bill To:
                    </Title>
                    <Text className="block font-bold">
                        {(order.user as unknown as User).name}
                    </Text>
                    <Text className="block">
                        {(order.user as unknown as User).email}
                    </Text>
                    <Text className="block mt-2">Shipping Address:</Text>
                    <Text className="block">
                        {order.shippingAddress.address},
                        {order.shippingAddress.ward},
                        {order.shippingAddress.district},
                        {order.shippingAddress.province}
                    </Text>
                </div>
                <div className="text-right">
                    <div className="mb-2">
                        <Text className="inline-block w-32">Invoice Date:</Text>
                        <Text className="inline-block ml-4 font-bold">
                            {dayjs(order.createdAt).format('DD/MM/YYYY')}
                        </Text>
                    </div>
                    <div className="mb-2">
                        <Text className="inline-block w-32">
                            Payment Status:
                        </Text>
                        <Text className="inline-block ml-4 font-bold">
                            {order.isPaid ? 'Paid' : 'Pending'}
                        </Text>
                    </div>
                    <div>
                        <Text className="inline-block w-32">
                            Payment Method:
                        </Text>
                        <Text className="inline-block ml-4 font-bold">
                            {order.paymentMethod}
                        </Text>
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <Table
                dataSource={order.orderItems}
                columns={columns}
                pagination={false}
                bordered
                className="mb-8"
                summary={() => (
                    <Table.Summary>
                        <Table.Summary.Row>
                            <Table.Summary.Cell
                                index={0}
                                colSpan={4}
                                align="right"
                            >
                                <Text strong>Subtotal:</Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1} align="right">
                                <Text strong>
                                    {formatCurrency(order.itemsPrice)}
                                </Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                        <Table.Summary.Row>
                            <Table.Summary.Cell
                                index={0}
                                colSpan={4}
                                align="right"
                            >
                                <Text>Shipping Fee:</Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1} align="right">
                                {formatCurrency(order.shippingPrice)}
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                        <Table.Summary.Row>
                            <Table.Summary.Cell
                                index={0}
                                colSpan={4}
                                align="right"
                            >
                                <Text>Tax:</Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1} align="right">
                                {formatCurrency(order.taxPrice)}
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                        <Table.Summary.Row className="font-bold">
                            <Table.Summary.Cell
                                index={0}
                                colSpan={4}
                                align="right"
                            >
                                <Text strong>Total Amount:</Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1} align="right">
                                <Text strong>
                                    {formatCurrency(order.totalPrice)}
                                </Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )}
            />

            {/* Footer */}
            <div className="mt-12">
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <Title level={5} className="!mb-2">
                            Terms & Conditions:
                        </Title>
                        <Text className="block text-sm">
                            1. Payment is due within 30 days
                            <br />
                            2. Please include invoice number on your payment
                            <br />
                            3. This is a computer generated invoice
                        </Text>
                    </div>
                    <div className="text-right">
                        <div className="mt-8 pt-8 border-t border-dashed">
                            <Text className="block mb-8">
                                Authorized Signature
                            </Text>
                            <Text className="block text-sm text-gray-500">
                                DTN Store Representative
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <div className="flex space-x-2">
                <Button
                    icon={<EyeOutlined />}
                    onClick={() => setIsPreviewVisible(true)}
                >
                    Preview Invoice
                </Button>
                <Button
                    type="primary"
                    icon={<PrinterOutlined />}
                    onClick={handlePrint}
                >
                    Print Invoice
                </Button>
            </div>

            <Modal
                title="Invoice Preview"
                open={isPreviewVisible}
                onCancel={() => setIsPreviewVisible(false)}
                width={1000}
                footer={[
                    <Button
                        key="back"
                        onClick={() => setIsPreviewVisible(false)}
                    >
                        Close
                    </Button>,
                    <Button
                        key="print"
                        type="primary"
                        icon={<PrinterOutlined />}
                        onClick={handlePrint}
                    >
                        Print
                    </Button>,
                ]}
            >
                <BillContent />
            </Modal>

            <div className="print-only" style={{ display: 'none' }}>
                <BillContent />
            </div>
        </>
    )
}
