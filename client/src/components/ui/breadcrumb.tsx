import React from 'react'
import { Breadcrumb, Typography } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

const MyBreadcrumb: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const pathnames = location.pathname.split('/').filter((x) => x) // Tách các path từ URL
    const breadcrumbItems = pathnames.map((path, index) => {
        const routePath = `/${pathnames.slice(0, index + 1).join('/')}` // Tạo link cho breadcrumb
        const isLastItem = index === pathnames.length - 1 // Kiểm tra xem đây có phải là phần tử cuối cùng

        // Logic để xác định tên cho từng mục breadcrumb dựa trên URL
        let breadcrumbName = ''
        switch (path) {
            case 'admin':
                breadcrumbName = 'Admin'
                break
            case 'products':
                breadcrumbName = 'Products'
                break
            case 'categories':
                breadcrumbName = 'Categories'
                break
            case 'product-details':
                breadcrumbName = 'Product Details'
                break
            default:
                breadcrumbName = path.charAt(0).toUpperCase() + path.slice(1)
        }

        return (
            <Breadcrumb.Item
                className="cursor-pointer hover:underline"
                key={routePath}
                onClick={() => !isLastItem && navigate(routePath)} // Chỉ cho phép điều hướng nếu không phải là mục cuối cùng
            >
                {isLastItem ? breadcrumbName : <Text>{breadcrumbName}</Text>}
            </Breadcrumb.Item>
        )
    })

    return (
        <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumbItems}</Breadcrumb>
    )
}

export default MyBreadcrumb
