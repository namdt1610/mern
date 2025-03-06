import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from './store'
import { setCredentials, logout } from './authSlice'

interface RefreshResponse {
    accessToken: string
}

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8888/api/auth/',
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).auth.accessToken
        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`)
        }
        return headers
    },
})

export const baseQueryWithReauth = async (
    args: any,
    api: any,
    extraOptions: any
) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        const data = refreshResult.data as RefreshResponse

        if (refreshResult.data) {
            api.dispatch(
                setCredentials({
                    user: (api.getState() as RootState).auth.user,
                    accessToken: data.accessToken,
                })
            )
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }
    }

    return result
}
