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
import store from '../redux/store';
import { Provider } from 'react-redux';

const Tab = createBottomTabNavigator();

const HomeScreen: () => Node = () => {
  
    return (
      <Provider store={store}>
        <Tab.Navigator>
          <Tab.Screen name="SignIn" component={SignInScreen} />
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