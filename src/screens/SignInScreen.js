import React from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button, Alert } from 'react-native';
import HeaderText from '../components/HeaderText';
import { useDispatch } from 'react-redux';
import { userSlice } from '../redux/slice/userSlice';

export default function SignInScreen() {
  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const dispatch = useDispatch();

  const handleSignInClick = () => {
    dispatch(userSlice.actions.login({
      userId: 99,
      userName: username,
      isLogin: true
    }));
  }

  const handleTestClick = () => {
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
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
      <View style={styles.centerContainer}>
        <HeaderText titleName="Quản lý thu chi"/>
      </View>
      <View style={styles.leftContainer}>
        <Text style={styles.textButton}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUsername}
          value={username}
          placeholder="Nhập số điện thoại"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Nhập mật khẩu"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.textButton}>Quên mật khẩu</Text>
      </View>
      <View style={styles.leftContainer}>
        <Button style={styles.button} title="Đăng nhập" onPress={handleSignInClick} />
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.textButton}>Chưa có tài khoản ?</Text>
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
  leftContainer: {
    borderWidth: 2,
    borderColor: 'green',
    marginBottom: 10,
  },
  rightContainer: {
    alignItems: 'flex-end',
    borderWidth: 2,
    borderColor: 'green',
    marginBottom: 10,
  },
  centerContainer: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'green',
    marginBottom: 10,
  },
  tinyLogo: {
    width: 50,
    height: 50,
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
    color: 'blue',
  },
  button: {
    textAlign: 'center',
    marginVertical: 8,
  },
});
