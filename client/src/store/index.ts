// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import { authApi } from 'services/AuthApi'
import { userApi } from 'services/UserApi'
import { categoryApi } from 'services/CategoryApi'
import { productApi } from 'services/ProductApi'
import { orderApi } from 'services/OrderApi'
import { cartApi } from 'services/CartApi'
import { inventoryApi } from 'services/InventoryApi'

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [inventoryApi.reducerPath]: inventoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            userApi.middleware,
            categoryApi.middleware,
            productApi.middleware,
            orderApi.middleware,
            cartApi.middleware,
            inventoryApi.middleware
        ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
