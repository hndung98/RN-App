import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        phoneNumber: '',
        fullname: '',
        position: '',
        isLogin: false
    },
    reducers: {
        login: (state, action) => { // type: 'user/login'
            state.phoneNumber = action.payload.phoneNumber,
            state.fullname = action.payload.fullname,
            state.position = action.payload.position,
            state.isLogin = action.payload.isLogin
        }
    }
});