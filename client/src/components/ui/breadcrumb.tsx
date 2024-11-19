import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Breadcrumb = () => {
    const location = useLocation()

    // Tạo một map để định nghĩa tên cho các phần của URL
    const breadcrumbNameMap = {
        '/admin': 'Home',
        '/admin/dashboard': 'Dashboard',
        '/admin/products': 'Product Management',
        '/admin/products/create': 'Add Product',
        '/admin/products/edit': 'Edit Product',
        '/admin/categories': 'Category Management',
        '/admin/categories/create': 'Add Category',
        '/admin/categories/edit': 'Edit Category',
        '/admin/orders': 'Order Management',
        '/admin/users': 'User Management',
        '/admin/settings': 'Settings',
        '/admin/users/add': 'Add User',
        '/admin/users/edit': 'Edit User',
    }

    // Tách đường dẫn hiện tại thành mảng
    const pathnames = location.pathname.split('/').filter((x) => x)

    return (
        <div className="breadcrumbs text-sm py-1">
            <ul>
                {/* Breadcrumb "Home" luôn xuất hiện */}

                {pathnames.map((name, index) => {
                    // Tạo URL cho các breadcrumb
                    const routeTo = `/${pathnames
                        .slice(0, index + 1)
                        .join('/')}`
                    const isLast = index === pathnames.length - 1

                    // Kiểm tra xem đường dẫn có trong map không
                    const breadcrumbLabel = breadcrumbNameMap[routeTo] || name

                    return isLast ? (
                        <li key={name}>
                            <span className="underline text-2xl inline-flex items-center gap-2">
                                {breadcrumbLabel}
                            </span>
                        </li>
                    ) : (
                        <li key={name}>
                            <Link to={routeTo} className='bg-[#caf0f8] text-2xl'>{breadcrumbLabel}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Breadcrumb
