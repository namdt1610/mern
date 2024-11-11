// hooks/useApiCall.ts
import { useReducer, useCallback } from 'react';

// State ban đầu
const initialState = { isLoading: false, error: null };

// Reducer để xử lý các hành động
const authReducer = (
    state: { isLoading: boolean; error: string | null },
    action: { type: string; payload?: any }
) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'STOP_LOADING':
            return { ...state, isLoading: false };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'RESET_ERROR':
            return { ...state, error: null };
        default:
            return state;
    }
};

// Hook useApiCall với cải tiến type và logic
const useApiCall = <T>(
    apiCall: (params: any) => Promise<T>,
    successAction: (data: T) => any,
    errorMessage: string
) => {
    const [state, dispatchState] = useReducer(authReducer, initialState);

    const callApi = useCallback(
        async (params: any = null) => {
            // Reset lỗi trước khi gọi API mới
            dispatchState({ type: 'RESET_ERROR' });
            dispatchState({ type: 'START_LOADING' });
            try {
                const data = await apiCall(params);
                dispatchState({ type: 'STOP_LOADING' });
                return successAction(data);
            } catch (error: any) {
                dispatchState({ type: 'STOP_LOADING' });
                const message = error.response?.data?.message || errorMessage;
                dispatchState({ type: 'SET_ERROR', payload: message });
                console.error(message, error);
            }
        },
        [apiCall, successAction, errorMessage]
    );

    return { callApi, isLoading: state.isLoading, error: state.error };
};

export default useApiCall;
