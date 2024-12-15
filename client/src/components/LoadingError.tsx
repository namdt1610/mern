// LoadingError.tsx
import React from 'react'
import {Button, Result, Spin} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'

interface LoadingErrorProps {
    isLoading: boolean
    error: any
    refetch?: () => void
}

const LoadingError: React.FC<LoadingErrorProps> = ({
    isLoading,
    error,
    refetch,
}) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin
                    fullscreen
                    tip="Loading..."
                    indicator={
                        <LoadingOutlined style={{ fontSize: 48 }} spin />
                    }
                />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Result
                    status="error"
                    title="Có lỗi xảy ra!"
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
