import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, ScrollView, View, StatusBar, StyleSheet, Image, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

import { userInfoSelector } from '../redux/selectors';
import { userSlice } from '../redux/slice/userSlice';
import { windowWidth, windowHeight } from '../redux/store';

import { db, firebaseConfig } from '../../firebase-config';
import { getDatabase, ref, set } from "firebase/database";

import { AddNewTransaction } from '../utils/services';
import { formatDateToYMDString, getYMD, isNumeric, createTransactionID } from '../utils/common';

const AVATAR_PANEL_HEIGHT = windowHeight * 0.1;
const CONTENT_PANEL_WIDTH = windowWidth * 0.92;
const MARGIN_CONTENT_PANEL_WIDTH = windowWidth * 0.04;
const TODAY_PANEL_HEIGHT = windowHeight * 0.15;
const MENU_ITEM_HEIGHT = windowHeight * 0.15;

const MENU_CODE = {
    MENU_SCREEN: 0,
    ADD_SCREEN: 1,
    REPORT_SCREEN: 2,
    PLAN_SCREEN: 3,
    ASSET_SCREEN: 4,
    ANALYSIS_SCREEN: 5,
    MEMBER_SCREEN: 6
}

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
    const [menuCode, setMenuCode] = useState(MENU_CODE.MENU_SCREEN);

    const userInfo = useSelector(userInfoSelector);

    useEffect(() => {
    }, []);

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

            <View>
                {
                    menuCode == MENU_CODE.MENU_SCREEN?
                    <MenuScreen setMenuCode={setMenuCode} userInfo={userInfo} />
                    : menuCode == MENU_CODE.ADD_SCREEN?
                    <AddScreen setMenuCode={setMenuCode} userInfo={userInfo} /> 
                    : menuCode == MENU_CODE.REPORT_SCREEN?
                    <ReportScreen setMenuCode={setMenuCode} userInfo={userInfo} /> 
                    : menuCode == MENU_CODE.PLAN_SCREEN?
                    <PlanScreen setMenuCode={setMenuCode} userInfo={userInfo} /> 
                    : menuCode == MENU_CODE.ASSET_SCREEN?
                    <AssetScreen setMenuCode={setMenuCode} userInfo={userInfo} /> 
                    : menuCode == MENU_CODE.ANALYSIS_SCREEN?
                    <AnalysisScreen setMenuCode={setMenuCode} userInfo={userInfo} /> 
                    : menuCode == MENU_CODE.MEMBER_SCREEN?
                    <MemberScreen setMenuCode={setMenuCode} userInfo={userInfo} /> 
                    : 
                    <>
                        <Text>Lỗi hiển thị</Text>
                    </>
                }
            </View>
            
        </View>
    );
};

const MenuScreen = (props) => {
    const userInfo = props.userInfo;
    const setMenuCode = props.setMenuCode;

    const [todayMoney, setTodayMoney] = useState(0);
    const [previosMoney, setPreviosMoney] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        setTodayMoney(323000);
        setPreviosMoney(300000);
        console.log('MENU_SCREEN');
        console.log(userInfo);
    }, []);

    return (
        <>
        
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
                    <TouchableOpacity onPress={() => {setMenuCode(MENU_CODE.ADD_SCREEN);}}>
                        <View style={styles.menuItemContainer}>            
                            <Image
                            style={[styles.avatar, styles.hCenter]}
                            source={require('../assets/add-menu.png')}
                            />
                            <Text style={styles.menuItem}>Thêm</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setMenuCode(MENU_CODE.ASSET_SCREEN);}}>
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
                    <TouchableOpacity onPress={() => {setMenuCode(MENU_CODE.REPORT_SCREEN);}}>
                        <View style={styles.menuItemContainer}>            
                            <Image
                            style={[styles.avatar, styles.hCenter]}
                            source={require('../assets/report-menu.png')}
                            />
                            <Text style={styles.menuItem}>Báo cáo</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setMenuCode(MENU_CODE.ANALYSIS_SCREEN);}}>
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
                    <TouchableOpacity onPress={() => {setMenuCode(MENU_CODE.PLAN_SCREEN);}}>
                        <View style={styles.menuItemContainer}>            
                            <Image
                            style={[styles.avatar, styles.hCenter]}
                            source={require('../assets/plan-menu.png')}
                            />
                            <Text style={styles.menuItem}>Kế hoạch</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setMenuCode(MENU_CODE.MEMBER_SCREEN);}}>
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
        </>
    );
}

const AddScreen = (props) => {
    const userInfo = props.userInfo;
    const setMenuCode = props.setMenuCode;

    // date picker
    const [exampleDate, setExampleDate] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [dateMode, setDateMode] = useState('date');
    const [isShowDatePicker, setIsShowDatePicker] = useState(false);

    // member input
    const [openMember, setOpenMember] = useState(false);
    const [member, setMember] = useState(null);
    const [memberList, setMemberList] = useState([
        { label: 'Chung', value: 'Chung' },
        { label: 'Tôi', value: 'Tôi' },
    ]);
    // type input
    const [openType, setOpenType] = useState(false);
    const [type, setType] = useState(null);
    const [typeList, setTypeList] = useState([
        { label: 'Ăn uống', value: 'Ăn uống' },
        { label: 'Dịch vụ', value: 'Dịch vụ' },
        { label: 'Shopping', value: 'Shopping' },
        { label: 'Khác', value: 'Khác' },
    ]);
    // other inputs
    const [name, setName] = useState('');
    const [money, setMoney] = useState('');

    const onChangeBirthday = (event, selectedDate) => {
        const currentDate = selectedDate;
        setIsShowDatePicker(false);
        if (selectedDate) {
            setDate(currentDate);
            setExampleDate(currentDate);
        }
        else {
            setDate(exampleDate);
        }
    };

    const showDatePicker = (currentMode) => {
        setIsShowDatePicker(true);
        setDateMode(currentMode);
    }

    DropDownPicker.setListMode("SCROLLVIEW");

    const AddNewTransactionClick = () => {
        let data = {
            id: createTransactionID(userInfo.phoneNumber),
            memberId: userInfo.phoneNumber,
            memberName: member,
            type: type,
            name: name,
            money: money,
            date: getYMD(date)
        }
        Alert.alert(
            "Thông báo",
            "Bạn có chắc chắn muốn thêm dữ liệu ?",
            [
                {
                    text: "OK",
                    onPress: () => {
                        AddNewTransaction(data, (res) => {
                            if (res.success) {
                                alert("Đã thêm thành công!");
                            }
                            else {
                                alert("Thêm thất bại!");
                            }
                        });
                    }
                },
                { 
                    text: "Hủy", 
                    onPress: () => {},
                    style: "cancel" 
                }
            ]
        );
        console.log(data);
    }

    useEffect(() => {
        console.log('ADD_SCREEN');
        // console.log(userInfo);
    }, []);

    return (
        <View style={[styles.contentContainer, styles.screenContainer, styles.firstContainer]}>
            <View style={{flexDirection: 'row'}}>
                <Image
                    style={[styles.smallAvatar, { margin: 10 }]}
                    source={require('../assets/add-menu.png')}
                />
                <Text style={{fontSize: 20, color: '#007DC3', marginTop: 'auto', marginBottom: 'auto'}}>Thêm giao dịch</Text>
            </View>
            <View>
                <Text style={styles.inputTitle}>Người giao dịch</Text>
                <DropDownPicker
                  style={styles.inputDropdown}
                  open={openMember}
                  value={member}
                  items={memberList}
                  setOpen={setOpenMember}
                  setValue={setMember}
                  setItems={setMemberList}
                  placeholder={"Chọn"}

                  zIndex={100}
                />
                <Text style={styles.inputTitle}>Loại giao dịch</Text>
                <DropDownPicker
                  style={styles.inputDropdown}
                  open={openType}
                  value={type}
                  items={typeList}
                  setOpen={setOpenType}
                  setValue={setType}
                  setItems={setTypeList}
                  placeholder={"Chọn"}
                  zIndex={90}
                />
                <Text style={styles.inputTitle}>Tên giao dịch</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder=""
                />
                <Text style={styles.inputTitle}>Số tiền (vnđ)</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setMoney}
                    value={money}
                    placeholder=""
                    keyboardType="numeric"
                />
                <Text style={styles.inputTitle}>Ngày giao dịch
                  <TouchableOpacity
                    style={styles.buttonIcon}
                    onPress={() => {showDatePicker('date');}} >
                    <Icon name="pencil" color="#007DC3" size={15} style={{marginLeft: 5}}/>
                  </TouchableOpacity>
                </Text>
                
                {isShowDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={dateMode}
                    is24Hour={true}
                    onChange={onChangeBirthday}
                  />
                )}
                <TextInput
                  style={styles.input}
                  editable={false}
                  value={formatDateToYMDString(date)}
                  placeholder="Chọn ngày"
                />
            </View>
            <View style={{width: '50%', marginTop: 20, marginBottom: 10, marginLeft: '25%', borderRadius: 10}}>
                <Button title="Hoàn tất" onPress={() => {AddNewTransactionClick();setMenuCode(MENU_CODE.MENU_SCREEN);}}/>
            </View>
        </View>
    );
}

const ReportScreen = (props) => {
    const userInfo = props.userInfo;
    const setMenuCode = props.setMenuCode;

    useEffect(() => {
        console.log('ADD_SCREEN');
        // console.log(userInfo);
    }, []);

    return (
        <View style={[styles.contentContainer, styles.screenContainer, styles.firstContainer]}>
            <View style={{flexDirection: 'row'}}>
                <Image
                    style={[styles.smallAvatar, { margin: 10 }]}
                    source={require('../assets/report-menu.png')}
                />
                <Text style={{fontSize: 20, color: '#007DC3', marginTop: 'auto', marginBottom: 'auto'}}>Báo cáo</Text>
            </View>
            <View style={{height: windowHeight * 0.6}}>
            </View>
            <View style={{width: '50%', marginTop: 20, marginBottom: 10, marginLeft: '25%', borderRadius: 10}}>
                <Button title="OK" onPress={() => {setMenuCode(MENU_CODE.MENU_SCREEN);}}/>
            </View>
        </View>
    );
}

const PlanScreen = (props) => {
    const userInfo = props.userInfo;
    const setMenuCode = props.setMenuCode;

    useEffect(() => {
        console.log('PLAN_SCREEN');
        console.log(userInfo);
    }, []);

    return (
        <View style={[styles.contentContainer, styles.screenContainer, styles.firstContainer]}>
            <View style={{flexDirection: 'row'}}>
                <Image
                    style={[styles.smallAvatar, { margin: 10 }]}
                    source={require('../assets/plan-menu.png')}
                />
                <Text style={{fontSize: 20, color: '#007DC3', marginTop: 'auto', marginBottom: 'auto'}}>Kế hoạch</Text>
            </View>
            <View style={{height: windowHeight * 0.6}}>
            </View>
            <View style={{width: '50%', marginTop: 20, marginBottom: 10, marginLeft: '25%', borderRadius: 10}}>
                <Button title="OK" onPress={() => {setMenuCode(MENU_CODE.MENU_SCREEN);}}/>
            </View>
        </View>
    );
}

const AssetScreen = (props) => {
    const userInfo = props.userInfo;
    const setMenuCode = props.setMenuCode;

    useEffect(() => {
        console.log('ASSET_SCREEN');
        console.log(userInfo);
    }, []);

    return (
        <View style={[styles.contentContainer, styles.screenContainer, styles.firstContainer]}>
            <View style={{flexDirection: 'row'}}>
                <Image
                    style={[styles.smallAvatar, { margin: 10 }]}
                    source={require('../assets/asset-menu.png')}
                />
                <Text style={{fontSize: 20, color: '#007DC3', marginTop: 'auto', marginBottom: 'auto'}}>Quản lý tài sản</Text>
            </View>
            <View style={{height: windowHeight * 0.6}}>
            </View>
            <View style={{width: '50%', marginTop: 20, marginBottom: 10, marginLeft: '25%', borderRadius: 10}}>
                <Button title="OK" onPress={() => {setMenuCode(MENU_CODE.MENU_SCREEN);}}/>
            </View>
        </View>
    );
}

const AnalysisScreen = (props) => {
    const userInfo = props.userInfo;
    const setMenuCode = props.setMenuCode;

    useEffect(() => {
        console.log('ANALYSIS_SCREEN');
        console.log(userInfo);
    }, []);

    return (
        <View style={[styles.contentContainer, styles.screenContainer, styles.firstContainer]}>
            <View style={{flexDirection: 'row'}}>
                <Image
                    style={[styles.smallAvatar, { margin: 10 }]}
                    source={require('../assets/analys-menu.png')}
                />
                <Text style={{fontSize: 20, color: '#007DC3', marginTop: 'auto', marginBottom: 'auto'}}>Phân tích</Text>
            </View>
            <View style={{height: windowHeight * 0.6}}>
            </View>
            <View style={{width: '50%', marginTop: 20, marginBottom: 10, marginLeft: '25%', borderRadius: 10}}>
                <Button title="OK" onPress={() => {setMenuCode(MENU_CODE.MENU_SCREEN);}}/>
            </View>
        </View>
    );
}

const MemberScreen = (props) => {
    const userInfo = props.userInfo;
    const setMenuCode = props.setMenuCode;

    useEffect(() => {
        console.log('MEMBER_SCREEN');
        console.log(userInfo);
    }, []);

    return (
        <View style={[styles.contentContainer, styles.screenContainer, styles.firstContainer]}>
            <View style={{flexDirection: 'row'}}>
                <Image
                    style={[styles.smallAvatar, { margin: 10 }]}
                    source={require('../assets/analys-menu.png')}
                />
                <Text style={{fontSize: 20, color: '#007DC3', marginTop: 'auto', marginBottom: 'auto'}}>Quản lý thành viên</Text>
            </View>
            <View style={{height: windowHeight * 0.6}}>
            </View>
            <View style={{width: '50%', marginTop: 20, marginBottom: 10, marginLeft: '25%', borderRadius: 10}}>
                <Button title="OK" onPress={() => {setMenuCode(MENU_CODE.MENU_SCREEN);}}/>
            </View>
        </View>
    );
}

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
    screenContainer: {
        backgroundColor: '#FFF',
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
    buttonIcon: {
        textAlign: 'center',
        marginVertical: 8,
        marginLeft: 15,
        color: '#007DC3',
    },
    avatar: {
      width: AVATAR_PANEL_HEIGHT * 0.7,
      height: AVATAR_PANEL_HEIGHT * 0.7,
      borderRadius: AVATAR_PANEL_HEIGHT * 0.3,
      marginBottom: 10,
    },
    smallAvatar: {
      width: AVATAR_PANEL_HEIGHT * 0.5,
      height: AVATAR_PANEL_HEIGHT * 0.5,
      borderRadius: AVATAR_PANEL_HEIGHT * 0.2,
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
    imgMenu: {
      width: AVATAR_PANEL_HEIGHT * 0.6,
      height: AVATAR_PANEL_HEIGHT * 0.6,
      marginBottom: 10
    },
    imgToday: {
      width: AVATAR_PANEL_HEIGHT * 0.6,
      height: AVATAR_PANEL_HEIGHT * 0.6,
      marginBottom: 10
    },
    input: {
      height: 50,
      marginLeft: '5%',
      marginBottom: 12,
      padding: 10,
      borderWidth: 1,
      borderTopWidth: 1,
      borderRightWidth: 1,
      borderLeftWidth: 1,
      borderRadius: 5,
      borderColor: '#0014C8',
      width: '90%',
    },
    inputTitle: {
      color: '#007DC3',
      marginLeft: '5%',
    },
    inputDropdown: {
      backgroundColor: '#fff',
      marginLeft: '5%',
      marginBottom: 12,
      width: '90%',
      borderColor: '#0014C8',
    },
});

export default HomeScreen