import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Bank {
    id: number // Mã ngân hàng
    name: string // Tên ngân hàng
    code: string // Mã ngân hàng viết tắt
    bin: string // BIN của ngân hàng
    shortName: string // Tên ngắn của ngân hàng
    logo: string // URL của logo ngân hàng
    transferSupported: number // Có hỗ trợ chuyển khoản không (1 là có, 0 là không)
    lookupSupported: number // Có hỗ trợ tra cứu không (1 là có, 0 là không)
}

interface QrCodeResponse {
    accountNo: number
    accountName: string
    acqId: string
    addInfo: string
    amount: number
    template: string
}

export const openApi = createApi({
    reducerPath: 'openApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://provinces.open-api.vn/api',
    }),
    endpoints: (builder) => ({
        getProvinces: builder.query<any, void>({
            query: () => '/?depth=3',
            keepUnusedDataFor: 3600,
        }),
    }),
})

export const { useGetProvincesQuery } = openApi
