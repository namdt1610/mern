import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8888/api',
    credentials: 'include', // Important for cookies
    prepareHeaders: (headers) => {
        // Add any auth headers here if needed
        return headers
    }
}) 