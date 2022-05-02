import { combineReducers } from "redux";
import userReducer from "./slice/userSlice";
import firebaseSlice from "./slice/firebaseSlice"

// const rootReducer = (state = {}, action) => {
//     console.log("============");
//     console.log("STATE");
//     console.log(state);
//     console.log("============");
//     console.log("ACTION");
//     console.log(action);
//     console.log("============");
//     return {
//         userInfo: userReducer(state.userInfo, action),
//     }
// }

const rootReducer = combineReducers ({
    userInfo: userReducer,
    firebaseInfo: firebaseSlice
});

export default rootReducer;