// const USER_ID = 99;
// const USER_NAME = "Van de Beek";
// const LOGIN_STATUS = true;

// export const login = {
//     type: 'Account/login',
//     payload: { userId: USER_ID, userName: USER_NAME, isLogin: LOGIN_STATUS }
// }

export const login = (data) => {
    return {
        type: 'user/login',
        payload: data
    }
}