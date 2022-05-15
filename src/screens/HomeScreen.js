import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ReactNativeScreen from './ReactNativeScreen';
import SettingsScreen from './SettingsScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import store from '../redux/store';
import { Provider } from 'react-redux';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}) => {
  useEffect(() => {
  });
  return (
    <Provider store={store}>
      <Tab.Navigator>
        <Tab.Screen name="SignUpScreen" component={SignUpScreen} />
        <Tab.Screen name="ReactNativeScreen" component={ReactNativeScreen} />
        <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
      </Tab.Navigator>
    </Provider>
  );
};


const styles = StyleSheet.create({
    highlight: {
      fontWeight: '700',
    },
  });

  export default HomeScreen