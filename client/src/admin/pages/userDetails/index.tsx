// UserDetail.tsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useUserActions from '../../../hooks/useUserActions'
import Descriptions from 'antd/lib/descriptions'
import Card from 'antd/lib/card'

const UserDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const { fetchUserById } = useUserActions()
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const getUser = async () => {
            const fetchedUser = await fetchUserById(id)
            setUser(fetchedUser)
        }
        getUser()
    }, [])

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <Card title="Thông tin người dùng" style={{ width: 600 }}>
            <Descriptions bordered>
                <Descriptions.Item label="Avatar">
                    <img src={user.avatar} alt="avatar" style={{ width: 50 }} />
                </Descriptions.Item>
                <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
                <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
                <Descriptions.Item label="Email">
                    {user.email}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                    {user.phone}
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                    {user.address}
                </Descriptions.Item>
            </Descriptions>
        </Card>
    )
}

export default UserDetail
