import React, { useEffect } from 'react'
import DataTable from '../../../components/DataTable/index'
import useUserActions from '../../../hooks/useUserActions'
export default function Users() {
    const { fetchUsers } = useUserActions()
    useEffect(() => {
        fetchUsers()
    }, [])

    const columns = [
        {
            title: 'Avatar',
            field: 'avatar',
        },
        {
            title: 'Name',
            field: 'name',
        },
        {
            title: 'Role',
            field: 'role',
        },
        {
            title: 'Email',
            field: 'email',
        },
        {
            title: 'Phone',
            field: 'phone',
        },
        {
            title: 'Address',
            field: 'address',
        },
        {
            title: 'Action',
            field: 'action',
        },
    ]
    const [users, setUsers] = React.useState([])

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchUsers()
            setUsers(data)
        }
        loadData()
    }, [])
    return (
        <>
            <DataTable data={users} columns={columns} />
        </>
    )
}
