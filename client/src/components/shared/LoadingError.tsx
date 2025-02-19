// LoadingError.tsx
import React from 'react'
import { Button, Result, Skeleton, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

interface LoadingErrorProps {
    title: string
    isLogin: boolean
    isLoading: boolean
    isError: any
    refetch?: () => void
}

const LoadingError: React.FC<LoadingErrorProps> = ({
    title,
    isLogin,
    isLoading,
    isError,
    refetch,
}) => {
    if (!isLogin)
        return (
            <div className="flex justify-center items-center h-screen">
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you must log in to access this page."
                    extra={
                        <Button
                            type="primary"
                            onClick={() => window.location.replace('/login')}
                        >
                            Login
                        </Button>
                    }
                />
            </div>
        )
    
    if (isLoading) {
        return <Skeleton active />
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Result
                    status="error"
                    title={title || 'There was an error'}
                    subTitle="Please try again later."
                    extra={
                        refetch && (
                            <Button type="primary" onClick={refetch}>
                                Refresh
                            </Button>
                        )
                    }
                />
            </div>
        )
    }

    return null
}

export default LoadingError
