import { useGetCartQuery } from '@/services/CartApi'
import { getUserFromCookie } from '@/utils/useGetToken'

export const useGetCart = (userId: string) => {
    const {
        data: cart,
        isLoading,
        error,
        refetch
    } = useGetCartQuery(userId, { skip: !userId })

    return {
        userId,
        cart,
        isLoading,
        error,
        refetch
    }
}
