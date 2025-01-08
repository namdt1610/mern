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

export interface QrCodeResponse {
    accountNo: number
    accountName: string
    acqId: string
    addInfo: string
    amount: number
    template: string
}

export const vietQrApi = createApi({
    reducerPath: 'vietQrBankApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.vietqr.io/v2' }),
    endpoints: (builder) => ({
        getBanks: builder.query<
            { code: string; desc: string; data: Bank[] },
            void
        >({
            query: () => '/banks',
            keepUnusedDataFor: 3600,
        }),

        generateQrCode: builder.query<
            { data: QrCodeResponse[] },
            { bankCode: string; amount: number }
        >({
            query: ({ bankCode, amount }) =>
                `/qr?bank=${bankCode}&amount=${amount}`,
        }),
    }),
})

export const { useGetBanksQuery } = vietQrApi
