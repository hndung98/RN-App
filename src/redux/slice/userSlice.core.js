const initState = {
    userId: 0,
    userName: '',
    isLogin: false,
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'user/login':
            return {
                ...state,
                userId: action.payload.userId,
                userName: action.payload.userName,
                isLogin: true,
            }
            break;    
        default:
            return state;
            break;
    }
}

export default userReducer;