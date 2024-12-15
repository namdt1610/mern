import React from 'react'
import {Link} from 'react-router-dom'

export default function User() {
    return (
        <>
            <Link to={'/user'}>
                <div className="avatar mx-2">
                    <div className="w-14 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
            </Link>
        </>
    )
}
