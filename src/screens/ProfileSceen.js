

import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Image, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
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
const ROW_ITEM_HEIGHT = windowHeight * 0.1;

const Section = ({ children, title }) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: '#6495ed',
                    },
                ]}>
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: '#6495ed',
                    },
                ]}>
                {children}
            </Text>
        </View>
    );
};

const ProfileScreen = () => {
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [position, setPosition] = useState('');

    const isDarkMode = useColorScheme() === 'dark';

    const navigation = useNavigation();
    const userInfo = useSelector(userInfoSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        setFullname(userInfo.fullname);
        setPhone(userInfo.phoneNumber);
        setPosition('TP Hồ Chí Minh');
    });

    const backgroundStyle = {
        backgroundColor: '#8CE3FF',
    };

    const handleSignOutClick = () => {
        Alert.alert(
            "Thông báo",
            "Bạn có chắc chắn muốn đăng xuất",
            [
                {
                    text: "Huỷ",
                    onPress: () => {},
                    style: "cancel"
                },
                { text: "OK", onPress: () => {signOut();} }
            ]
        );
    }

    const signOut = () => {
        dispatch(userSlice.actions.login({
            userId: -1,
            userName: '',
            isLogin: false
        }));
        navigation.reset({
            index: 0,
            routes: [{ name: 'SignInScreen' }],
        });
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <View style={styles.mainContainer}>
                    <View style={styles.centerContainerRowFlex}>
                        <View style={styles.avatarContainer}>
                            <Image
                                style={[styles.avatar, { marginLeft: 10 }]}
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
                        <View style={[styles.leftInfoContainer, styles.vSpaceTop10]}>
                            <Image
                                style={[styles.imgAvatar, styles.hCenter]}
                                source={require('../assets/avatar.png')}
                            />
                        </View>
                        <View style={[styles.rightInfoContainer, styles.vSpaceTop10]}>
                            <View style={{flexDirection: 'row'}}>
                                <Image
                                    style={[styles.infoIcon]}
                                    source={require('../assets/icon-user.png')}
                                />
                                <Text style={{ color: '#007DC3', fontSize: 20 }}> {fullname} </Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Image
                                    style={[styles.infoIcon]}
                                    source={require('../assets/icon-phone.png')}
                                />
                                <Text style={{ color: '#007DC3', fontSize: 20 }}> {phone} </Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Image
                                    style={[styles.infoIcon]}
                                    source={require('../assets/icon-position.png')}
                                />
                                <Text style={{ color: '#007DC3', fontSize: 20 }}> {position}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.contentContainer, styles.vSpaceBot20]}>
                        <View style={[styles.centerContainerRowFlex]}>
                            <View style={styles.menuTitleContainer}>
                                <Text style={[styles.hCenter, styles.menuTitle]}>Các tính năng</Text>
                            </View>
                        </View>

                        <View style={{backgroundColor: '#fff', marginTop: 10}}>
                            <TouchableOpacity>
                                <View style={styles.rowItemContainer}>
                                    <View style={styles.leftItemContainer}>
                                        <Image
                                            style={[styles.icon, styles.hCenter]}
                                            source={require('../assets/icon-key.png')}
                                        />
                                    </View>
                                    <View style={styles.centerItemContainer}>
                                        <Text style={styles.itemText}>Đổi mật khẩu</Text>
                                    </View>
                                    <View style={styles.rightItemContainer}>
                                        <Text style={styles.rightIcon}>{">"}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.rowItemContainer}>
                                    <View style={styles.leftItemContainer}>
                                        <Image
                                            style={[styles.icon, styles.hCenter]}
                                            source={require('../assets/icon-moon.png')}
                                        />
                                    </View>
                                    <View style={styles.centerItemContainer}>
                                        <Text style={styles.itemText}>Chế độ tối</Text>
                                    </View>
                                    <View style={styles.rightItemContainer}>
                                        <Text style={styles.rightIcon}>{">"}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.rowItemContainer}>
                                    <View style={styles.leftItemContainer}>
                                        <Image
                                            style={[styles.icon, styles.hCenter]}
                                            source={require('../assets/icon-note.png')}
                                        />
                                    </View>
                                    <View style={styles.centerItemContainer}>
                                        <Text style={styles.itemText}>Ghi chú</Text>
                                    </View>
                                    <View style={styles.rightItemContainer}>
                                        <Text style={styles.rightIcon}>{">"}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.rowItemContainer}>
                                    <View style={styles.leftItemContainer}>
                                        <Image
                                            style={[styles.icon, styles.hCenter]}
                                            source={require('../assets/icon-help.png')}
                                        />
                                    </View>
                                    <View style={styles.centerItemContainer}>
                                        <Text style={styles.itemText}>Hỗ trợ</Text>
                                    </View>
                                    <View style={styles.rightItemContainer}>
                                        <Text style={styles.rightIcon}>{">"}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.rowItemContainer}>
                                    <View style={styles.leftItemContainer}>
                                        <Image
                                            style={[styles.icon, styles.hCenter]}
                                            source={require('../assets/icon-info.png')}
                                        />
                                    </View>
                                    <View style={styles.centerItemContainer}>
                                        <Text style={styles.itemText}>Hướng dẫn sử dụng</Text>
                                    </View>
                                    <View style={styles.rightItemContainer}>
                                        <Text style={styles.rightIcon}>{">"}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSignOutClick}>
                                <View style={styles.rowItemContainer}>
                                    <View style={styles.leftItemContainer}>
                                        <Image
                                            style={[styles.icon, styles.hCenter]}
                                            source={require('../assets/icon-logout.png')}
                                        />
                                    </View>
                                    <View style={styles.centerItemContainer}>
                                        <Text style={styles.itemText}>Đăng xuất</Text>
                                    </View>
                                    <View style={styles.rightItemContainer}>
                                        <Text style={styles.rightIcon}>{">"}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
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
    rowItemContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 20,
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
        backgroundColor: '#fff',
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
    leftInfoContainer: {
        backgroundColor: '#FFF',
        flex: 0.3,
        height: TODAY_PANEL_HEIGHT,
    },
    centerInfoContainer: {
        backgroundColor: '#FFF',
        flex: 0.1,
        height: TODAY_PANEL_HEIGHT,
    },
    rightInfoContainer: {
        backgroundColor: '#FFF',
        flex: 0.6,
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
    leftItemContainer: {
        backgroundColor: '#FFF',
        flex: 0.2,
    },
    centerItemContainer: {
        backgroundColor: '#FFF',
        flex: 0.7,
    },
    rightItemContainer: {
        backgroundColor: '#FFF',
        flex: 0.1,
        textAlign: 'right'
    },
    notFirstGroupContainer: {
        marginLeft: 0.02 * CONTENT_PANEL_WIDTH
    },
    colItemContainer: {
        backgroundColor: '#FFF',
        height: ROW_ITEM_HEIGHT,
        position: 'relative',
    },
    itemText: {
        textAlign: 'left',
        fontSize: 17,
        color: '#474747'
    },
    rightIcon: {
        fontSize: 20,
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
    vCenter: {
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
    imgAvatar: {
        width: AVATAR_PANEL_HEIGHT,
        height: AVATAR_PANEL_HEIGHT,
        marginBottom: 10
    },
    infoIcon: {
        width: AVATAR_PANEL_HEIGHT*0.2,
        height: AVATAR_PANEL_HEIGHT*0.2,
        marginTop: 7,
    },
});

export default ProfileScreen