import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

function BreadcrumbExample() {
    const location = useLocation()

    // Tạo một map để định nghĩa tên cho các phần của URL
    const breadcrumbNameMap = {
        '/admin': 'Dashboard',

        '/admin/products': 'Product Management',
        '/admin/products/create': 'Add Product',
        '/admin/products/edit': 'Edit Product',

        '/admin/categories': 'Category Management',
        '/admin/categories/create': 'Add Category',
        '/admin/categories/edit': 'Edit Category',

        '/admin/users': 'User Management',
        '/admin/settings': 'Settings',
        '/admin/users/add': 'Add User',
        '/admin/users/edit': 'Edit User',
    }

    // Tách đường dẫn hiện tại thành mảng
    const pathnames = location.pathname.split('/').filter((x) => x)

    return (
        <div className="py-1">
            <Breadcrumb>
                {/* Breadcrumb "Home" luôn xuất hiện */}
                {/* <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item> */}

                {pathnames.map((name, index) => {
                    // Tạo URL cho các breadcrumb
                    const routeTo = `/${pathnames
                        .slice(0, index + 1)
                        .join('/')}`
                    const isLast = index === pathnames.length - 1

                    // Kiểm tra xem đường dẫn có trong map không
                    const breadcrumbLabel = breadcrumbNameMap[routeTo] || name

                    return isLast ? (
                        <Breadcrumb.Item active key={name}>
                            {breadcrumbLabel}
                        </Breadcrumb.Item>
                    ) : (
                        <Breadcrumb.Item
                            linkAs={Link}
                            linkProps={{ to: routeTo }}
                            key={name}
                        >
                            {breadcrumbLabel}
                        </Breadcrumb.Item>
                    )
                })}
            </Breadcrumb>
        </div>
    )
}

export default BreadcrumbExample
