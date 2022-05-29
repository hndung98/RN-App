import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { userInfoSelector } from '../redux/selectors';
import { userSlice } from '../redux/slice/userSlice';
import { windowWidth, windowHeight } from '../redux/store';

import { db, firebaseConfig } from '../../firebase-config';
import { getDatabase, ref, set } from "firebase/database";

import { setUser, getUser } from '../utils/services';

const HomeScreen = () => {
    const [isLogin, setIsLogin] = useState(false);

    const navigation = useNavigation();

    const userInfo = useSelector(userInfoSelector);

    const dispatch = useDispatch();

    useEffect(() => {
    });

    const handleTextClick = () => {
        dispatch(userSlice.actions.login({
            userId: 0,
            userName: '',
            isLogin: false
        }));
        alert(userInfo.userName);
    }

    const handlePostClick = () => {
        setUser(userInfo, (data) => {
            if (data.success) {
                alert('post successful!');
            }
            else {
                alert('error');
            }
        });
    }

    const handleGetClick = () => {
        getUser(userInfo.userId, (data) => {
            if (data.success) {
                alert('username is ' + data.userName);
            }
            else {
                alert('error');
            }
        });
    }

    const handleSignOutClick = () => {
        dispatch(userSlice.actions.login({
            userId: -1,
            userName: '',
            isLogin: false
        }));
        navigation.reset({
            index: 0,
            routes: [{ name: 'SignInScreen' }],
        });
        alert('Signed out');
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.centerContainer}>
                <Text style={styles.avatarContainer}>Avatar</Text>
                <Text style={styles.notifyContainer}>Notify</Text>
            </View>
            <View style={[styles.centerContainer, styles.contentContainer, styles.firstContainer]}>
                <Text style={styles.leftTodayContainer}>Left Today</Text>
                <Text style={styles.rightTodayContainer}>Right Today</Text>
            </View>
            <View style={[styles.centerContainer, styles.contentContainer]}>
                <View style={styles.menuGroupItemContainer}>
                    <Text style={styles.menuItemContainer}>Menu 1</Text>
                    <Text style={styles.menuItemContainer}>Menu 4</Text>
                </View>
                <View style={styles.menuGroupItemContainer}>
                    <Text style={styles.menuItemContainer}>Menu 2</Text>
                    <Text style={styles.menuItemContainer}>Menu 5</Text>
                </View>
                <View style={styles.menuGroupItemContainer}>
                    <Text style={styles.menuItemContainer}>Menu 3</Text>
                    <Text style={styles.menuItemContainer}>Menu 6</Text>
                </View>
            </View>
            <View style={[styles.centerContainer, styles.contentContainer]}>
                <Text>History</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#6BA9E2',
        height: '100%'
    },
    centerContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 20,
    },
    contentContainer: {
        width: windowWidth *0.9,
        marginLeft: windowWidth*0.05,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#FFF'
    },
    firstContainer: {        
        marginTop: -30
    },
    avatarContainer: {
        backgroundColor: '#ffaa00',
        flex: 0.5,
        textAlign: 'left',
        height: windowHeight * 0.1
    },
    notifyContainer: {
        backgroundColor: '#ffaa00',
        flex: 0.5,
        textAlign: 'right',
        height: windowHeight * 0.1
    },
    leftTodayContainer: {
        backgroundColor: '#ffaa00',
        flex: 0.3,
        height: windowHeight * 0.15
    },
    rightTodayContainer: {
        backgroundColor: '#ffaa00',
        flex: 0.7,
        height: windowHeight * 0.15
    },
    menuGroupItemContainer: {
        backgroundColor: '#ffaa00',
        flex: 0.3,
    },
    menuItemContainer: {
        backgroundColor: '#ffaa00',
        height: windowHeight * 0.1
    },
    highlight: {
        fontWeight: '700',
    },
    button: {
        textAlign: 'center',
        marginVertical: 8,
        color: '#007DC3'
    },
});

export default HomeScreen