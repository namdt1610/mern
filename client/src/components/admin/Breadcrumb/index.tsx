import React from 'react'
import { Breadcrumb } from 'antd'
import { useLocation, Link } from 'react-router-dom'
import styles from './styles/Breadcrumb.module.scss'

const BreadcrumbComponent: React.FC = () => {
    const location = useLocation()
    const pathSnippets = location.pathname.split('/').filter((i) => i)

    const items = [
        {
            title: <Link to="/admin">Home</Link>,     
        },
        ...pathSnippets.map((snippet, index) => ({
            title: (
                <Link to={`/${pathSnippets.slice(0, index + 1).join('/')}`}>
                    {snippet}
                </Link>
            ),
        })),
    ]

    return <Breadcrumb className={styles.breadcrumb} items={items} />
}

export default BreadcrumbComponent
