import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { userInfoSelector } from '../redux/selectors';
import { userSlice } from '../redux/slice/userSlice';
import { windowWidth, windowHeight } from '../redux/store';

import { db, firebaseConfig } from '../../firebase-config';
import { getDatabase, ref, set } from "firebase/database";

import { setUser, getUser } from '../utils/services';

const AVATAR_PANEL_HEIGHT = windowHeight * 0.1;
const CONTENT_PANEL_WIDTH = windowWidth * 0.92;
const MARGIN_CONTENT_PANEL_WIDTH = windowWidth * 0.04;
const TODAY_PANEL_HEIGHT = windowHeight * 0.15;
const MENU_ITEM_HEIGHT = windowHeight * 0.15;

const compareRatio = (today, previous) => {
    let msg = "";
    if (today >= previous){
        msg = "Tăng " + (100 * today / previous).toFixed(1);
    }
    else {
        msg = "Giảm " + (100 * previous / today).toFixed(1);
    }
    return msg + "%";
}

const HomeScreen = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [todayMoney, setTodayMoney] = useState(0);
    const [previosMoney, setPreviosMoney] = useState(0);

    const navigation = useNavigation();

    const userInfo = useSelector(userInfoSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        setTodayMoney(323000);
        setPreviosMoney(300000);
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
            <View style={styles.centerContainerRowFlex}>
                <View style={styles.avatarContainer}>            
                    <Image
                    style={[styles.avatar, {marginLeft: 10}]}
                    source={require('../assets/avatar.png')}
                    />
                </View>
                <View style={styles.notifyContainer}>
                </View>
                <View style={styles.notifyContainer}>
                    <TouchableOpacity>
                        <Image
                        style={[styles.icon, styles.hCenter]}
                        source={require('../assets/notify.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.centerContainerRowFlex, styles.contentContainer, styles.firstContainer, styles.vSpaceBot20]}>
                <View style={[styles.leftTodayContainer, styles.vSpaceTop10]}>            
                    <Image
                    style={[styles.imgToday, styles.hCenter]}
                    source={require('../assets/today.png')}
                    />
                    <Text style={styles.hCenter}>Chi tiêu</Text>
                    <Text style={styles.hCenter}>hôm nay</Text>
                </View>
                <View style={[styles.rightTodayContainer, styles.vSpaceTop10]}>
                    <Text style={{color: '#FF703B', fontSize: 25}}>{todayMoney} vnđ</Text>
                    <Text style={{color: '#0d4a14', fontSize: 16}}>({compareRatio(todayMoney, previosMoney)})</Text>
                </View>
            </View>

            <View style={[styles.contentContainer, styles.vSpaceBot20]}>
                <View style={[styles.centerContainerRowFlex]}>
                    <View style={styles.menuTitleContainer}>
                        <Text style={[styles.hCenter, styles.menuTitle]}>Menu</Text>
                    </View>
                </View>

                <View style={[styles.centerContainerRowFlex]}>
                    <View style={[styles.menuGroupItemContainer, styles.notFirstGroupContainer]}>
                        <TouchableOpacity>
                            <View style={styles.menuItemContainer}>            
                                <Image
                                style={[styles.avatar, styles.hCenter]}
                                source={require('../assets/add-menu.png')}
                                />
                                <Text style={styles.menuItem}>Thêm</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.menuItemContainer}>            
                                <Image
                                style={[styles.avatar, styles.hCenter]}
                                source={require('../assets/asset-menu.png')}
                                />
                                <Text style={styles.menuItem}>Tài sản</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.menuGroupItemContainer, styles.notFirstGroupContainer]}>
                        <TouchableOpacity>
                            <View style={styles.menuItemContainer}>            
                                <Image
                                style={[styles.avatar, styles.hCenter]}
                                source={require('../assets/report-menu.png')}
                                />
                                <Text style={styles.menuItem}>Báo cáo</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.menuItemContainer}>            
                                <Image
                                style={[styles.avatar, styles.hCenter]}
                                source={require('../assets/analys-menu.png')}
                                />
                                <Text style={styles.menuItem}>Phân tích</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.menuGroupItemContainer, styles.notFirstGroupContainer]}>
                        <TouchableOpacity>
                            <View style={styles.menuItemContainer}>            
                                <Image
                                style={[styles.avatar, styles.hCenter]}
                                source={require('../assets/plan-menu.png')}
                                />
                                <Text style={styles.menuItem}>Kế hoạch</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.menuItemContainer}>            
                                <Image
                                style={[styles.avatar, styles.hCenter]}
                                source={require('../assets/member-menu.png')}
                                />
                                <Text style={styles.menuItem}>Thành viên</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={[styles.centerContainerRowFlex, styles.contentContainer, styles.vSpaceBot20, styles.height100]}>
                <Text style={styles.hCenter}>History</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#6BA9E2',
        height: '100%',
    },
    centerContainerRowFlex: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        alignItems: 'center',
        textAlign: 'center',
    },
    centerContainerColFlex: {
        flexDirection: 'column',
        backgroundColor: '#FFF',
        alignItems: 'center',
        textAlign: 'center',
    },
    contentContainer: {
        width: CONTENT_PANEL_WIDTH,
        marginLeft: MARGIN_CONTENT_PANEL_WIDTH,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#636363',
    },
    firstContainer: {        
        marginTop: -30
    },
    avatarContainer: {
        backgroundColor: '#FFF',
        flex: 0.6,
        textAlign: 'left',
        height: AVATAR_PANEL_HEIGHT
    },
    notifyContainer: {
        backgroundColor: '#FFF',
        flex: 0.2,
        textAlign: 'right',
        height: AVATAR_PANEL_HEIGHT
    },
    leftTodayContainer: {
        backgroundColor: '#FFF',
        flex: 0.3,
        height: TODAY_PANEL_HEIGHT,

    },
    rightTodayContainer: {
        backgroundColor: '#FFF',
        flex: 0.7,
        height: TODAY_PANEL_HEIGHT
    },
    menuTitleContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        height: 25,
    },
    menuTitle: {
        color: '#007DC3',
        fontSize: 20,
    },
    menuGroupItemContainer: {
        backgroundColor: '#FFF',
        flex: 0.32,
    },
    notFirstGroupContainer: {
        marginLeft: 0.02 * CONTENT_PANEL_WIDTH
    },
    menuItemContainer: {
        backgroundColor: '#FFF',
        height: MENU_ITEM_HEIGHT,
        position: 'relative',
    },
    menuItem: {
        textAlign: 'center'
    },
    highlight: {
        fontWeight: '700',
    },
    button: {
        textAlign: 'center',
        marginVertical: 8,
        color: '#007DC3'
    },
    avatar: {
      width: AVATAR_PANEL_HEIGHT * 0.7,
      height: AVATAR_PANEL_HEIGHT * 0.7,
      borderRadius: AVATAR_PANEL_HEIGHT * 0.3,
      marginBottom: 10,
    },
    icon: {
      width: AVATAR_PANEL_HEIGHT * 0.4,
      height: AVATAR_PANEL_HEIGHT * 0.4,
      borderRadius: AVATAR_PANEL_HEIGHT * 0.15,
    },
    hCenter: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    vSpaceTop10: {
        marginTop: 10,
    },
    vSpaceBot20: {
        marginBottom: 20,
    },
    height100: {
        height: 100,
    },
    imgToday: {
      width: AVATAR_PANEL_HEIGHT * 0.6,
      height: AVATAR_PANEL_HEIGHT * 0.6,
      marginBottom: 10
    },
});

export default HomeScreen