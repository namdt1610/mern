import { useGetCartQuery } from '@/services/CartApi'

export const useGetCart = () => {
    const userId = getUserFromCookie()?._id
    return useGetCartQuery(userId!)
}
