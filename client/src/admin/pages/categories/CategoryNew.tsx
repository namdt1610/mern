import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useAddCategoryMutation} from '@/services/CategoryApi'
import {Button, Card, Form, FormProps, Input, message} from 'antd/lib'

type FieldType = {
    name: string
}

type CategoryFormProps = {
    from: string
}
const CategoryNewForm: React.FC<CategoryFormProps> = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [createCategory, isLoading] = useAddCategoryMutation()

    const onFinish: FormProps<FieldType>['onFinish'] = async (values: any) => {
        createCategory(values)
            .then(() => {
                message.success('Category created successfully')
                form.resetFields()
            })
            .catch((error) => {
                if (error?.data?.message) {
                    message.error(error.data.message)
                } else {
                    message.error(
                        'Failed to create category. Please try again.'
                    )
                }
                console.error('Error from backend:', error)
            })
    }

    return (
        <Card className="card-border my-4">
            <Form form={form} layout="vertical" onFinish={onFinish}>
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
