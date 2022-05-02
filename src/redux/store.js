import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slice/userSlice';
import { firebaseSlice } from './slice/firebaseSlice';
import { Dimensions } from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const store = configureStore({
    reducer: {
        userInfo: userSlice.reducer
    }
});

export default store;