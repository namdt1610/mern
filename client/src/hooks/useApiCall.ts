// hooks/useApiCall.ts
import { useCallback } from 'react'
import { useApiContext } from '../contexts/ApiContext'

type ApiCallFn<T> = (params: any) => Promise<T>

const useApiCall = <T>(
    apiCall: ApiCallFn<T>,
    onSuccess: (data: T) => void,
    onError: (error: any) => void
) => {
    const { dispatch } = useApiContext()

    const callApi = useCallback(
        async (params: any) => {
            dispatch({ type: 'SET_LOADING', payload: true })
            try {
                const result = await apiCall(params)
                onSuccess(result) // Xử lý kết quả từ API
            } catch (error) {
                // Gửi lỗi lên frontend để xử lý
                onError(error)
                dispatch({
                    type: 'SET_ERROR',
                    payload: 'An error occurred, please try again later',
                })
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false })
            }
        },
        [apiCall, onSuccess, onError, dispatch]
    )

    return callApi
}

export default useApiCall
