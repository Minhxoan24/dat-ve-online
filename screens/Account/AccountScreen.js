import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from '../../context/UserContext';

const AccountScreen = ({ route, navigation }) => {

    const { user } = route.params;



    const handleLogout = async () => {
        await AsyncStorage.removeItem("user"); // Xoá thông tin tài khoản
        navigation.replace("Home"); // Chuyển về màn hình đăng nhập
    };
    return (
        <View style={styles.container}>
            {/* Header */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.header}>
                <View onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={20} color="green" />
                </View>
                <Text style={styles.headerTitle}>ACCOUNT INFORMATION</Text>

            </TouchableOpacity>

            <ScrollView>
                {/* Avatar */}
                <View style={styles.avatarContainer}>
                    <Image source={require('../../assets/img/avt-icon.png')} style={styles.avatar} />
                    <Text style={styles.username}>User 23984234759</Text>
                </View>

                {/* Danh sách chức năng */}
                <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('AccountInfo', { user: user })}>
                    <Icon name="id-card" size={25} color="green" />
                    <Text style={styles.listText}>Thông tin tài khoản</Text>
                    <Icon name="chevron-right" size={18} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('ChangePassword', { user: user })}>
                    <Icon name="lock" size={25} color="green" />
                    <Text style={styles.listText}>Thay đổi mật khẩu</Text>
                    <Icon name="chevron-right" size={18} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('AccountMember')}>
                    <Icon name="wallet" size={25} color="green" />
                    <Text style={styles.listText}>Thẻ thành viên</Text>
                    <Icon name="chevron-right" size={18} color="gray" />
                </TouchableOpacity>

                <View style={styles.separator} />

                <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('AccountPoint')}>
                    <Icon name="coins" size={25} color="green" />
                    <Text style={styles.listText}>Tích điểm</Text>
                    <Icon name="chevron-right" size={18} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('AccountGift')}>
                    <Icon name="credit-card" size={25} color="green" />
                    <Text style={styles.listText}>Thẻ quà tặng</Text>
                    <Icon name="chevron-right" size={18} color="gray" />
                </TouchableOpacity>

                <View style={styles.separator} />

                <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('PurchasedTicket')}>
                    <Text style={styles.listText}>Lịch sử giao dịch</Text>
                    <Icon name="chevron-right" size={18} color="gray" />
                </TouchableOpacity>

                <View style={styles.separator} />

                <TouchableOpacity style={styles.logout} onPress={handleLogout}>
                    <Icon name="sign-out-alt" size={25} color="red" />
                    <Text style={styles.logoutText}>Đăng xuất </Text>

                </TouchableOpacity>

            </ScrollView>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        marginTop: 30,
    },
    header: {
        flexDirection: 'row',

        padding: 15,
        backgroundColor: 'white',
        elevation: 2,
    },
    headerTitle: {
        flex: 1,
        paddingLeft: 20,
        fontSize: 18,

    },
    avatarContainer: {
        alignItems: 'center',
        marginVertical: 40,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 50,
        backgroundColor: '#DFFFD6',
        padding: 20,
    },
    username: {
        marginTop: 10,
        fontSize: 16,

    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 30,
        paddingHorizontal: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    logout: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 30,
        paddingHorizontal: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        alignItems: "center"
    },
    listText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 15,
    },
    logoutText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 15,
        color: "red"
    },
    separator: {
        height: 40,
        backgroundColor: '#F4F4F4',
    },
});

export default AccountScreen;
