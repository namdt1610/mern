// src/redux/Store.ts
import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '@/services/AuthApi'
import { userApi } from '@/services/UserApi'
import { categoryApi } from '@/services/CategoryApi'
import { productApi } from '@/services/ProductApi'
import { orderApi } from '@/services/OrderApi'
import { cartApi } from '@/services/CartApi'
import { inventoryApi } from '@/services/InventoryApi'
import { customerApi } from '@/services/CustomerApi'
import { paymentMethodApi } from '@/services/PaymentMethodApi'
import { vietQrApi } from '@/services/VietQrApi'
import { openApi } from '@/services/OpenApi'
import { dashboardApi } from '@/services/DashboardApi'
import { reviewApi } from '@/services/ReviewApi'
import { WarehouseApi } from '@/services/WarehouseApi'
import authReducer from './authSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [inventoryApi.reducerPath]: inventoryApi.reducer,
        [customerApi.reducerPath]: customerApi.reducer,
        [paymentMethodApi.reducerPath]: paymentMethodApi.reducer,
        [vietQrApi.reducerPath]: vietQrApi.reducer,
        [openApi.reducerPath]: openApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer,
        [WarehouseApi.reducerPath]: WarehouseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            userApi.middleware,
            categoryApi.middleware,
            productApi.middleware,
            orderApi.middleware,
            cartApi.middleware,
            inventoryApi.middleware,
            customerApi.middleware,
            paymentMethodApi.middleware,
            vietQrApi.middleware,
            openApi.middleware,
            dashboardApi.middleware,
            reviewApi.middleware,
            WarehouseApi.middleware
        ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
