// src/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../services/auth'

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer, // Thêm reducer của authApi
    },
    // Thêm middleware của RTK Query để hỗ trợ caching, invalidation, polling, và các tính năng khác
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
