import React from 'react'
import {Button, Result} from 'antd/'
import {Link} from 'react-router-dom'

const App: React.FC = () => (
    <div className="min-w-screen min-h-screen flex items-center justify-center">
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={
                <Link to={'/admin/login'}>
                    <Button type="primary">Back to Login</Button>
                </Link>
            }
        />
    </div>
)

export default App
