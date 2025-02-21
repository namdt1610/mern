import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        minify: 'esbuild', // Hoặc 'esbuild' nếu cần tốc độ nhanh hơn
        sourcemap: true, // Nếu bạn cần sourcemaps cho việc debug
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor'
                    }
                    if (id.includes('components')) {
                        return 'components'
                    }
                },
            },
        },
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
    plugins: [react(), sentryVitePlugin({
        org: "none-k7t",
        project: "javascript-react"
    })],
    resolve: {
        alias: {
            '@/': `${path.resolve(__dirname, 'src')}/`,
            '@shared': `${path.resolve(__dirname, '../shared')}/`,
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