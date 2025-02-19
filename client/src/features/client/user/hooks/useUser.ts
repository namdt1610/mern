import { getUserFromCookie } from '@/utils/useGetToken'

export const useUser = () => {
    const userId = getUserFromCookie()?._id

    return {
        userId,
    }
}
