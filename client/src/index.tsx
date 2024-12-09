import './index.css'
import React from 'react'
import ClientRoutes from './client/routes/ClientRoutes'
import AdminRoutes from './admin/routes/AdminRoutes'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import store from './store/Store'

const App = () => (
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider
                theme={{
                    token: {
                        fontFamily: "'Karla', sans-serif",
                        colorPrimary: '#81C784', // Nút chính (xanh lá cây nhạt)
                        colorText: '#333333', // Màu chữ chính (đen)
                        colorTextSecondary: '#AAAAAA', // Màu chữ phụ (xám nhạt)
                        colorTextDisabled: '#A5A5A5', // Màu chữ disabled (xám sáng)
                        borderRadius: 8, // Bo góc
                        controlHeight: 40, // Chiều cao nút
                        colorBgContainer: '#FFFFFF', // Nền container trắng
                    },
                    components: {
                        Button: {
                            colorPrimary: '#81C784', // Nút chính (xanh lá cây nhạt)
                            colorBgContainer: '#81C784', // Nền cho container nút
                            colorTextLightSolid: '#FFFFFF', // Chữ trên nền nút
                            borderRadius: 8, // Bo góc riêng cho nút
                            colorPrimaryHover: '#66BB6A', // Màu hover nút chính
                        },
                        Menu: {
                            itemColor: '#333333', // Màu chữ trong menu
                            itemSelectedColor: '#7EB3F1', // Màu chữ khi chọn item trong menu
                        },
                    },
                }}
            >
                <Router>
                    <Routes>
                        <Route path="/*" element={<ClientRoutes />} />
                        <Route path="admin/*" element={<AdminRoutes />} />
                    </Routes>
                </Router>
            </ConfigProvider>
        </Provider>
    </React.StrictMode>
)

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
