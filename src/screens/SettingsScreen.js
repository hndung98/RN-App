import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoSelector } from '../redux/selectors';
import { userSlice } from '../redux/slice/userSlice';

import { db, firebaseConfig } from '../../firebase-config';
import { getDatabase, ref, set } from "firebase/database";

const SettingsScreen = () => {
  const [isLogin, setIsLogin] = useState(false);

  const userInfo = useSelector(userInfoSelector);

  const dispatch = useDispatch();

  const handleTextClick = () => {
    dispatch(userSlice.actions.login({
      userId: 0,
      userName: '',
      isLogin: false
    }));
    alert(userInfo.userName);
  }

  const handleClick = () => {
    const db2 = getDatabase();
    set(ref(db, 'users/' + '001'), {
      userId: userInfo.userId,
      userName: userInfo.userName
    })
    .then(() => {
      alert('Data saved successfully!');
    })
    .catch((error) => {
      alert('The write failed...');
    });
  }

  return (
      <View>
          <Text onPress={handleTextClick}>Settings Page</Text>
          <Text>user id: {userInfo.userId}</Text>
          <Text>user name: {userInfo.userName}</Text>
          <Text>login status: {userInfo.isLogin === true ? 'true' : 'false'}</Text>
          <Button style={styles.button} title="Write Data" onPress={handleClick} />
      </View>
  );
};


const styles = StyleSheet.create({
    highlight: {
      fontWeight: '700',
    },
    button: {
      textAlign: 'center',
      marginVertical: 8,
    },
  });

  export default SettingsScreen