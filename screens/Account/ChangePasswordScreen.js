import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = ({ route, navigation }) => {
    const { user } = route.params;



    const [showPassword, setShowPassword] = useState({
        current: true,
        new: true,
        confirm: true,
    });

    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const togglePasswordVisibility = (field) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };
    const handleLogout = async () => {
        await AsyncStorage.removeItem("user"); // Xoá thông tin tài khoản
        navigation.replace("Home"); // Chuyển về màn hình đăng nhập
    };

    const handleChangePassword = async () => {
        if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (form.newPassword !== form.confirmPassword) {
            Alert.alert("Lỗi", "Mật khẩu mới không trùng khớp!");
            return;
        }

        try {

            const apiUrl = `https://67d07fbb825945773eb11f01.mockapi.io/api/signup/users/${user.id}`;
            console.log(user.password);
            if (user.password !== form.currentPassword) {
                Alert.alert("Lỗi", "Mật khẩu hiện tại không chính xác!");
                return;
            }

            // Gửi yêu cầu cập nhật mật khẩu
            const response = await axios.put(apiUrl, { ...user, password: form.newPassword });

            // Cập nhật lại user trong context


            // Thông báo và quay lại màn hình đăng nhập
            Alert.alert("Thành công", "Mật khẩu đã được thay đổi!", [
                { text: "OK", onPress: handleLogout }
            ]);


        } catch (error) {
            Alert.alert("Lỗi", "Không thể cập nhật mật khẩu. Vui lòng thử lại!");
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
                <View>
                    <Icon name="chevron-left" size={20} color="green" />
                </View>
                <Text style={styles.headerTitle}>ACCOUNT INFORMATION</Text>
            </TouchableOpacity>

            {/* Mật khẩu đăng nhập */}
            <Text style={styles.sectionTitle}>MẬT KHẨU ĐĂNG NHẬP</Text>

            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu hiện tại"
                    secureTextEntry={showPassword.current}
                    onChangeText={(text) => handleChange('currentPassword', text)}
                />
                <TouchableOpacity onPress={() => togglePasswordVisibility('current')}>
                    <Icon name={showPassword.current ? "eye-slash" : "eye"} size={20} color="gray" />
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu mới"
                    secureTextEntry={showPassword.new}
                    onChangeText={(text) => handleChange('newPassword', text)}
                />
                <TouchableOpacity onPress={() => togglePasswordVisibility('new')}>
                    <Icon name={showPassword.new ? "eye-slash" : "eye"} size={20} color="gray" />
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    placeholder="Xác nhận mật khẩu mới"
                    secureTextEntry={showPassword.confirm}
                    onChangeText={(text) => handleChange('confirmPassword', text)}
                />
                <TouchableOpacity onPress={() => togglePasswordVisibility('confirm')}>
                    <Icon name={showPassword.confirm ? "eye-slash" : "eye"} size={20} color="gray" />
                </TouchableOpacity>
            </View>

            {/* Nút cập nhật */}
            <TouchableOpacity style={styles.updateButton} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Đổi mật khẩu</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9D9D9',
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

    sectionTitle: {
        fontSize: 14,
        color: 'gray',
        padding: 20,
        paddingBottom: 10,

    },

    input: {
        backgroundColor: '#FFFFFF',




    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#D9D9D9',
        alignItems: "center"
    },
    label: {
        fontSize: 16,
        color: "#D9D9D9"
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    updateButton: {
        width: "80%",
        backgroundColor: '#4CDE4C',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: "auto"
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },

});

export default ChangePassword;
