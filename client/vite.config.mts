import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
    build: {
        outDir: 'build',
        minify: 'esbuild', // Hoặc 'esbuild' nếu cần tốc độ nhanh hơn
        sourcemap: true, // Nếu bạn cần sourcemaps cho việc debug
    },
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
            hooks: path.resolve(__dirname, 'src/hooks'),
            services: path.resolve(__dirname, 'src/services'),
            components: path.resolve(__dirname, 'src/components'),
            utils: path.resolve(__dirname, 'src/utils'),
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
    optimizeDeps: {
        include: ['antd'],
    },
})
