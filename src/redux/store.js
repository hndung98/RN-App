import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slice/userSlice';
import { firebaseSlice } from './slice/firebaseSlice';

const store = configureStore({
    reducer: {
        userInfo: userSlice.reducer
    }
});

export default store;