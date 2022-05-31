
import { getDatabase, ref, set, onValue } from "firebase/database";
import { db } from '../../firebase-config';

export const setUser = (userInfo, callback) => {
    set(ref(db, 'users/' + userInfo.userId), {
      userId: userInfo.userId,
      userName: userInfo.userName
    })
    .then(() => {
        if (callback) callback({
            success: true,
            error: null
        });
    })
    .catch((error) => {
        if (callback) callback({
            success: false,
            error: error
        });
    });
}

export const getUser = (userId, callback) => {
    const starCountRef = ref(db, 'users/' + userId);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (callback) {
            callback({
                ...data,
                success: true
            });
        }
    });
}

export const signUpNewUser = (user, callback) => {
    const starCountRef = ref(db, 'users/' + user.phoneNumber);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data != null){
            if (callback) {
                callback({
                    msg: "Số điện thoại này đã được đăng ký.",
                    success: false
                });
            }
        }
        else {
            if (callback) {
                set(ref(db, 'users/' + user.phoneNumber), {
                    ...user
                })
                callback({
                    msg: "Đăng ký thành công.",
                    success: true
                });
            }
        }
    });
}

export const signInUser = (user, callback) => {
    const starCountRef = ref(db, 'users/' + user.phoneNumber);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data != null){
            if (data.password === user.password){
                if (callback) {
                    callback({
                        data: {
                            user: data,
                            msg: ''
                        },
                        success: true
                    });
                }
            }
            else {
                if (callback) {
                    callback({
                        data: {
                            user: null,
                            msg: 'Nhập sai mật khẩu.'
                        },
                        success: false
                    });
                }
            }
        }
        else {
            if (callback) {
                callback({
                    data: {
                        user: null,
                        msg: 'Số điện thoại đã nhập không chính xác.'
                    },
                    success: false
                });
            }
        }
    });
}