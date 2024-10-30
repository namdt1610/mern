import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Home() {
    return (
        <>
            <h1>
                <Skeleton />
                Home
            </h1>
        </>
    )
}

export default Home
