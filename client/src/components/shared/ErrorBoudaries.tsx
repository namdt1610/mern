import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button, Empty } from 'antd'
import * as Sentry from '@sentry/react'

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean
    errorKey: number
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false, errorKey: 0 }
    }

    static getDerivedStateFromError(_: Error): State {
        // Khi có lỗi, cập nhật state để hiển thị fallback UI
        return { hasError: true, errorKey: 0 }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log lỗi ra console
        console.error('ErrorBoundary caught an error:', error, errorInfo)
        // Gửi lỗi cùng thông tin bổ sung đến hệ thống logging (ví dụ: Sentry)
        Sentry.captureException(error, {
            extra: { componentStack: errorInfo.componentStack },
        })
    }

    // Hàm reset lỗi, tăng giá trị errorKey để buộc remount component con
    handleRetry = () => {
        this.setState((prevState) => ({
            hasError: false,
            errorKey: prevState.errorKey + 1,
        }))
    }

    render() {
        if (this.state.hasError) {
            return (
                <Empty description="Đã xảy ra lỗi khi hiển thị component.">
                    <Button onClick={this.handleRetry}>Thử lại</Button>
                </Empty>
            )
        }
        // Dùng key để buộc remount lại component con khi reset lỗi
        return (
            <React.Fragment key={this.state.errorKey}>
                {this.props.children}
            </React.Fragment>
        )
    }
}

export default ErrorBoundary
