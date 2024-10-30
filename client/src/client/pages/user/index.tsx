import React, { useEffect } from 'react'
import useUserActions from 'hooks/useUserActions'
import Sidebar from '../../../components/user/Sidebar'

const User = () => {
    
    return (
        <div className="flex">
            <div className="flex-auto w-1/4">
                <Sidebar />
            </div>
            <div className="flex-auto w-3/4">Main</div>
        </div>
    )
}

export default User
