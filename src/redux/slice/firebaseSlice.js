import { createSlice } from '@reduxjs/toolkit';

// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, set  } from "firebase/database";
// import { firebaseConfig } from "../../../firebase-config";


// const app = initializeApp(firebaseConfig);

// const database = getDatabase(app);

// function writeUserData(userId, name, email) {
//     const db = getDatabase();
//     set(ref(db, 'Users/' + userId), {
//         username: name,
//         email: email
//     });
// }

export const firebaseSlice = createSlice({
    name: 'firebase',
    initialState: {
        config: 'hd',
    },
    reducers: {
        clear: (state, action) => { // type: 'firebase/clear'
            state.config = ''
        }
    }
});