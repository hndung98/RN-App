import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button, Alert } from 'react-native';
import HeaderText from '../components/HeaderText';
import { useDispatch } from 'react-redux';
import { userSlice } from '../redux/slice/userSlice';
import { windowWidth, windowHeight } from '../redux/store';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function SignInScreen() {
  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
  });

  const handleSignInClick = () => {
    navigation.navigate('HomeScreen');
    dispatch(userSlice.actions.login({
      userId: username,
      userName: username,
      isLogin: true
    }));
  }

  const handleSignUpClick = () => {
    navigation.navigate('SignUpScreen');
    // Alert.alert(
    //   "Title",
    //   "Message",
    //   [
    //     {
    //       text: "Cancel",
    //       onPress: () => console.log("Cancel Pressed"),
    //       style: "cancel"
    //     },
    //     { text: "OK", onPress: () => console.log("Pressed SignUp") }
    //   ]
    // );
  }

  const handleTestClick = () => {
    Alert.alert(
      "Title",
      "Message",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
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
          onChangeText={onChangeUsername}
          value={username}
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
        <Text style={styles.textButton} onPress={handleTestClick}>Phiên bản 1.01</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#6BA9E2',
  },
  logoContainer: {
    height: windowHeight*0.3,
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
