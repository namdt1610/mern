import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
    //! Cấu hình cho tailwindcss
    css: {
        preprocessorOptions: {
            css: {},
        },
        postcss: {
            plugins: [tailwindcss, autoprefixer],
        },
    },
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
        },
    },
    define: {
        'process.env': {}, // Thêm dòng này để định nghĩa process trong môi trường browser
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8888',
                changeOrigin: true,
                secure: false,
            },
        },
    },
    build: {
        outDir: 'build',
    },
})
