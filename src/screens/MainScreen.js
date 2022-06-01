import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import store from '../redux/store';

import ProfileScreen from './ProfileSceen';
import SettingsScreen from './SettingsScreen';
import HomeScreen from './HomeScreen';

const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation }) => {
  
  return (
    <Provider store={store}>
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }
            else {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
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

export default MainScreen