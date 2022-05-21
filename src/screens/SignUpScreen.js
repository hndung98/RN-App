import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, ScrollView, View, StatusBar, StyleSheet, Image, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import HeaderText from '../components/HeaderText';
import { useDispatch } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
//import DatePicker from 'react-native-datepicker';
//import DatePicker from 'react-native-date-picker';

import { userSlice } from '../redux/slice/userSlice';
import { windowWidth, windowHeight } from '../redux/store';
import { formatDateToYMDString } from '../utils/common';

export default function SignUpScreen() {
  const [phoneNumber, onChangePhoneNumber] = React.useState('');
  const [fullname, onChangeFullname] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [passwordAgain, onChangePasswordAgain] = React.useState('');

  // gender input
  const [openGender, setOpenGender] = useState(false);
  const [gender, setGender] = useState(null);
  const [genderList, setGenderList] = useState([
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'}
  ]);
  
  // birthday input 
  // const [dateOfBirth, setDateOfBirth] = useState(new Date());
  // const [openDateOfBirth, setOpenDateOfBirth] = useState(false);
  const [exampleDate, setExampleDate] = useState(new Date(1598051730000));
  const [birthday, setBirthday] = useState(new Date(1598051730000));
  const [birthdayMode, setBirthdayMode] = useState('date');
  const [isShowBirthday, setIsShowBirthday] = useState(false);
  
  const onChangeBirthday = (event, selectedDate) => {
    const currentDate = selectedDate;
    setIsShowBirthday(false);
    if (selectedDate) {
      setBirthday(currentDate);
      setExampleDate(currentDate);
    }
    else {
      setBirthday(exampleDate);
    }
  };

  const showBirthdatPicker = (currentMode) => {
    setIsShowBirthday(true);
    setBirthdayMode(currentMode);
  }

  const dispatch = useDispatch();
  DropDownPicker.setListMode("SCROLLVIEW");
  useEffect(() => {
    //alert("SignUpScreen");
  });

  const handleSignUpClick = () => {
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
    <SafeAreaView style={{flex: 1}}>
    <StatusBar/>
    <ScrollView
      contentInsetAdjustmentBehavior="automatic">
    <View style={styles.container}>
      <View style={[styles.centerContainer, styles.logoContainer]}>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/bill-icon.png')}
        />
        <HeaderText titleName="Quản lý thu chi"/>
        <Text style={styles.textButton}>Đăng ký tài khoản</Text>
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
        <Text style={styles.textButton}>Họ tên</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeFullname}
          value={fullname}
          placeholder="Nhập họ tên"
        />
        <Text style={styles.textButton}>Giới tính</Text>
        <DropDownPicker
          style={styles.dropdown}
          open={openGender}
          value={gender}
          items={genderList}
          setOpen={setOpenGender}
          setValue={setGender}
          setItems={setGenderList}
        />
        <Text style={styles.textButton}>Mật khẩu</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Nhập mật khẩu"
          secureTextEntry={true}
        />
        <Text style={styles.textButton}>Nhập lại mật khẩu</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePasswordAgain}
          value={passwordAgain}
          placeholder="Nhập mật khẩu"
          secureTextEntry={true}
        />
        <Text style={styles.textButton}>Ngày sinh 
          <TouchableOpacity
            style={styles.button}
            onPress={() => {showBirthdatPicker('date');}} >
            <Icon name="pencil" color="#fff" size={25} />
          </TouchableOpacity>
        </Text>
        
        {isShowBirthday && (
          <DateTimePicker
            testID="dateTimePicker"
            value={birthday}
            mode={birthdayMode}
            is24Hour={true}
            onChange={onChangeBirthday}
          />
        )}
        <TextInput
          style={styles.input}
          editable={false}
          value={formatDateToYMDString(birthday)}
          placeholder="Chọn ngày"
        />

        {/* <View style={styles.dateInput}>
          <View style={{flex: 6}}>
            <TextInput
              style={styles.input}
              onChangeText={() => {}}
              value={formatDateToYMDString(birthday)}
              placeholder="Chọn ngày"
            />
          </View>
          <View style={{flex: 1}}>
            <Button onPress={() => {showBirthdatPicker('date');}} title="" />
          </View>
        </View> */}
        
        <View style={styles.leftContainer}>
          <Button style={styles.button} title="Đăng ký" onPress={handleSignUpClick} />
        </View>
      </View>
      <View style={[styles.centerContainer, styles.infoContainer]}>
        <Text style={styles.textButton} onPress={handleTestClick}>Phiên bản 1.01</Text>
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
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
    //height: windowHeight*0.3,
  },
  infoContainer: {
    //height: windowHeight*0.2,
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
  dateInput: {
    height: 40,
    marginBottom: 12,
    flexDirection: "row"
  },
  textButton: {
    color: '#000080',
  },
  button: {
    textAlign: 'center',
    marginVertical: 8,
  },
  dropdown: {
    backgroundColor: '#6BA9E2',
  }
});
