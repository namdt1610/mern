import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    userId: string | null // null nếu chưa có userId
}

const initialState: UserState = {
    userId: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload
        },
        clearUserId: (state) => {
            state.userId = null
        },
    },
})

export const { setUserId, clearUserId } = userSlice.actions
export default userSlice.reducer
