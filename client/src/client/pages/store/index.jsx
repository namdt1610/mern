import React from 'react'
import LeftColumn from './LeftCol'
import Men from './Men'
import RightColumn from './RightCol'

const Store = () => {
    return (
        <div className="flex">
            <div className="flex-auto w-1/4">
                <LeftColumn />
            </div>
            <div className="flex-auto w-3/4">
                <Men />
            </div>
            <div className="flex-auto w-1/4">
                <RightColumn />
            </div>
        </div>
    )
}

export default Store
