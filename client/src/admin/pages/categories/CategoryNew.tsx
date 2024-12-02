import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCategoryActions from '../../../hooks/Auth/useCategoryActions'
import { Button, Input, Form, message, Card, FormProps } from 'antd/lib'
type FieldType = {
    name: string
}

type CategoryFormProps = {
    from: string
}
const CategoryNewForm: React.FC<CategoryFormProps> = () => {
    const [form] = Form.useForm()
    const { createCategory } = useCategoryActions()

    const onFinish: FormProps<FieldType>['onFinish'] = async (values: any) => {
        await createCategory(values)
        form.resetFields()
    }

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
        errorInfo
    ) => {
        message.error('Failed to create category')
        console.log('Failed:', errorInfo)
    }
    return (
        <Card className="card-border my-4">
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Category Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter category name!',
                        },
                    ]}
                >
                    <Input placeholder="Enter category name" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create Category
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default CategoryNewForm
