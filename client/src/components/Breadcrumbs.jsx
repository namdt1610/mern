import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Breadcrumbs() {
    const location = useLocation()

    // Tách đường dẫn hiện tại thành mảng
    const pathnames = location.pathname.split('/').filter((x) => x)

    return (
        <div className="breadcrumbs text-sm">
            {/* Breadcrumb "Home" luôn xuất hiện */}
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>

                {/* Render các Breadcrumb còn lại dựa trên đường dẫn */}
                {pathnames.map((name, i) => {
                    // Tạo URL cho các breadcrumb
                    const routeTo = `/${pathnames.slice(0, i + 1).join('/')}`
                    const isLast = i === pathnames.length - 1

                    return isLast ? (
                        // Breadcrumb cuối cùng là "active"
                        <li key={i}>
                            <Link className="underline capitalize" to={routeTo}>
                                {name}
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link to={routeTo}>{name}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Breadcrumbs
