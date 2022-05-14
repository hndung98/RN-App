import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ReactNativeScreen from './ReactNativeScreen';
import SettingsScreen from './SettingsScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import store from '../redux/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}) => {  
    return (
      <Provider store={store}>
        <Tab.Navigator>
          <Tab.Screen name="SignUp" component={SignUpScreen} />
          <Tab.Screen name="Home" component={ReactNativeScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
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