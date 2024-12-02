import useSWR from 'swr'
import axios from 'axios'

const fetchUser = async (url: string) => {
    const res = await axios.get(url)
    return res.data
}

export const useAuth = () => {
    const { data, error } = useSWR('/api/user', fetchUser)

    return {
        user: data,
        isLoading: !data && !error,
        error,
    }
}
