
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