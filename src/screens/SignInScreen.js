import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button, Alert } from 'react-native';
import HeaderText from '../components/HeaderText';
import { useDispatch } from 'react-redux';
import { userSlice } from '../redux/slice/userSlice';
import { windowWidth, windowHeight } from '../redux/store';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { signInUser } from '../utils/services';

const isNumeric = (str) => {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export default function SignInScreen() {
  const [phoneNumber, onChangePhoneNumber] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
  });

  const handleSignInClick = () => {
    if (!validateForm().success){
      showAlert(validateForm().msg);
    }
    else if (!validatePassword().success){
      showAlert(validatePassword().msg);
    }
    else if (!validatePhone().success){
      showAlert(validatePhone().msg)
    }
    else{
      signInUser({
        phoneNumber: phoneNumber,
        password: password
      }, 
      (res) => {
        if(res.success){
          console.log(res.data.user);
          dispatch(userSlice.actions.login({
            phoneNumber: phoneNumber,
            fullname: res.data.user.fullname,
            isLogin: true
          }));
          navigation.reset({
            index: 0,
            routes: [{name: 'MainScreen'}],
          });
        }
        else{
          showAlert(res.data.msg)
        }
      });
    }
    return;
  }

  const handleSignUpClick = () => {
    navigation.navigate('SignUpScreen');
  }

  const validateForm = () => {
    if (phoneNumber.length === 0){
      return {success: false, msg: 'Vui lòng nhập số điện thoại'};
    }
    else if (password.length === 0){
      return {success: false, msg: 'Vui lòng nhập mật khẩu'};
    }
    return {success: true, msg: ''};
  }

  const validatePhone = () => {
    if (isNumeric(phoneNumber)) {
      if(phoneNumber.length !== 10){
        return {success: false, msg: 'Số điện thoại không hợp lệ'};
      }
    }
    else {
      return {success: false, msg: 'Số điện thoại không hợp lệ'};
    }
    return {success: true, msg: ''};
  }

  const validatePassword = () => {
    if (password.length < 6){
      return {success: false, msg: 'Độ dài mật khẩu phải lớn hơn 5'};
    }
    return {success: true, msg: ''};
  }

  const showAlert = (msg) => {
    Alert.alert(
      "Thông báo",
      msg,
      [
        {
          text: "OK",
          onPress: () => {},
          style: "cancel"
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.centerContainer, styles.logoContainer]}>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/bill-icon.png')}
        />
        <HeaderText titleName="Quản lý thu chi"/>
      </View>
      <View style={[styles.leftContainer, styles.inputContainer]}>
        <Text style={styles.textButton}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePhoneNumber}
          value={phoneNumber}
          placeholder="Nhập số điện thoại"
          keyboardType="numeric"
        />
        <Text style={styles.textButton}>Mật khẩu</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Nhập mật khẩu"
          secureTextEntry={true}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.textButton}>Quên mật khẩu</Text>
        </View>
        <View style={styles.leftContainer}>
          <Button style={styles.button} title="Đăng nhập" onPress={handleSignInClick} />
        </View>
      </View>
      <View style={[styles.centerContainer, styles.infoContainer]}>
        <Text style={styles.textButton} onPress={handleSignUpClick}>Chưa có tài khoản ?</Text>
      </View>
      <View style={[styles.centerContainer, styles.infoContainer]}>
        <Text style={styles.textButton} >Phiên bản 1.01</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#6BA9E2',
    position: 'absolute',
    width: '100%'
  },
  logoContainer: {
    height: windowHeight*0.3,
    marginTop: 20,
  },
  inputContainer: {
    height: windowHeight*0.3,
  },
  infoContainer: {
    height: windowHeight*0.2,
  },  
  leftContainer: {
    marginBottom: 10,
  },
  rightContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  centerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  textButton: {
    color: '#000080',
  },
  button: {
    textAlign: 'center',
    marginVertical: 8,
  },
});
