import { useParams } from 'react-router-dom'
import { getUserFromCookie } from '@/utils/useGetToken'
import { useGetFavoritesQuery } from '@/services/UserApi'
import { useGetProductByIdQuery } from '@/services/ProductApi'
import { useGetInventoryByProductIdQuery } from '@/services/InventoryApi'

export const useProducts = () => {
    const userId = getUserFromCookie()?._id ?? ''
    const productId = useParams<{ productId: string }>().productId ?? ''
    const {
        data: product,
        refetch,
        isLoading,
        error,
    } = useGetProductByIdQuery(productId!, {
        skip: !productId,
    })
    const { data: stock } = useGetInventoryByProductIdQuery(productId!, {
        skip: !productId,
    })
    const { data: favorites } = useGetFavoritesQuery(userId!, {
        skip: !userId,
    })

    return {
        userId,
        productId,
        product,
        isLoading,
        error,
        refetch,
        stock,
        favorites,
    }
}
