// LoadingError.tsx
import React from 'react'
import { Button, Result, Spin } from 'antd'
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
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin
                    fullscreen
                    tip="Loading..."
                    indicator={
                        <LoadingOutlined style={{ fontSize: 100 }} spin />
                    }
                />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Result
                    status="error"
                    title={title || 'Đã xảy ra lỗi'}
                    subTitle="Vui lòng thử lại sau."
                    extra={
                        refetch && (
                            <Button type="primary" onClick={refetch}>
                                Thử lại
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
