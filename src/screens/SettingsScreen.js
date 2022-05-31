import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { userInfoSelector } from '../redux/selectors';
import { userSlice } from '../redux/slice/userSlice';

import { db, firebaseConfig } from '../../firebase-config';
import { getDatabase, ref, set } from "firebase/database";

import { setUser, getUser } from '../utils/services';

const SettingsScreen = () => {
  const [isLogin, setIsLogin] = useState(false);

  const navigation = useNavigation();

  const userInfo = useSelector(userInfoSelector);

  const dispatch = useDispatch();

  useEffect(() => {
  });

  const handleTextClick = () => {
    // dispatch(userSlice.actions.login({
    //   userId: 0,
    //   userName: '',
    //   isLogin: false
    // }));
    alert(userInfo.userName);
  }

  const handlePostClick = () => {
    // setUser(userInfo, (data) => {
    //   if (data.success) {
    //     alert('post successful!');
    //   }
    //   else {
    //     alert('error');
    //   }
    // });
  }

  const handleGetClick = () => {
    // getUser(userInfo.userId, (data) => {
    //   if(data.success){
    //     alert('username is ' + data.userName);
    //   }
    //   else{
    //     alert('error');
    //   }
    // });
  }

  const handleSignOutClick = () => {
    dispatch(userSlice.actions.login({
      phoneNumber: -1,
      fullname: '',
      isLogin: false
    }));
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignInScreen' }],
    });
    alert('Signed out');
  }

  return (
    <View>
      <Text onPress={handleTextClick}>Settings Page</Text>
      <Text>user id: {userInfo.phoneNumber}</Text>
      <Text>user name: {userInfo.fullname}</Text>
      <Text>login status: {userInfo.isLogin === true ? 'true' : 'false'}</Text>
      <View style={styles.centerContainer}>
        <Button style={styles.button} title="Post Data" onPress={handlePostClick} />
      </View>
      <View style={styles.centerContainer}>
        <Button style={styles.button} title="Get Data" onPress={handleGetClick} />
      </View>
      <View style={styles.centerContainer}>
        <Button style={styles.button} title="Sign out" onPress={handleSignOutClick} />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  centerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    textAlign: 'center',
    marginVertical: 8,
  },
});

export default SettingsScreen