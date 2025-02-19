import { useGetCartQuery } from '@/services/CartApi'
import { getUserFromCookie } from '@/utils/useGetToken'

export const useGetCart = () => {
    const userId = getUserFromCookie()?._id
    const { data: cart } = useGetCartQuery(userId!)

    return {
        userId,
        cart,
    }
}
