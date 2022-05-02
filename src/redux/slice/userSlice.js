import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: 0,
        userName: '',
        isLogin: false
    },
    reducers: {
        login: (state, action) => { // type: 'user/login'
            state.userId = action.payload.userId,
            state.userName = action.payload.userName,
            state.isLogin = action.payload.isLogin
        }
    }
});