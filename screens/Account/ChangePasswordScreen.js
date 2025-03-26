import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = ({ route, navigation }) => {
    const { user } = route.params;

    const [showPassword, setShowPassword] = useState({
        old: true,
        new: true,
    });

    const [form, setForm] = useState({
        oldpassword: '',
        newpassword: '',
    });

    const togglePasswordVisibility = (field) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem("user");
        navigation.replace("Home");
    };

    const handleChangePassword = async () => {
        if (!form.oldpassword || !form.newpassword) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (form.oldpassword === form.newpassword) {
            Alert.alert("Lỗi", "Hãy thay đổi mật khẩu khác mạnh hơn!");
            return;
        }

        try {
            const apiUrl = `http://localhost:8000/change-password/${user.id}`;
            const response = await axios.put(apiUrl, form);

            Alert.alert("Thành công", response.data.message, [
                { text: "OK", onPress: handleLogout }
            ]);

        } catch (error) {
            Alert.alert("Lỗi", error.response?.data?.detail || "Không thể cập nhật mật khẩu!");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={20} color="green" />
                <Text style={styles.headerTitle}>ĐỔI MẬT KHẨU</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>MẬT KHẨU ĐĂNG NHẬP</Text>

            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu cũ"
                    secureTextEntry={showPassword.old}
                    onChangeText={(text) => handleChange('oldpassword', text)}
                />
                <TouchableOpacity onPress={() => togglePasswordVisibility('old')}>
                    <Icon name={showPassword.old ? "eye-slash" : "eye"} size={20} color="gray" />
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu mới"
                    secureTextEntry={showPassword.new}
                    onChangeText={(text) => handleChange('newpassword', text)}
                />
                <TouchableOpacity onPress={() => togglePasswordVisibility('new')}>
                    <Icon name={showPassword.new ? "eye-slash" : "eye"} size={20} color="gray" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.updateButton} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Đổi mật khẩu</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#D9D9D9', marginTop: 30 },
    header: { flexDirection: 'row', padding: 15, backgroundColor: 'white', elevation: 2 },
    headerTitle: { flex: 1, paddingLeft: 20, fontSize: 18 },
    sectionTitle: { fontSize: 14, color: 'gray', padding: 20, paddingBottom: 10 },
    input: { backgroundColor: '#FFFFFF', flex: 1 },
    row: { flexDirection: 'row', padding: 20, paddingVertical: 10, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#D9D9D9', alignItems: "center" },
    updateButton: { width: "80%", backgroundColor: '#4CDE4C', padding: 10, borderRadius: 20, alignItems: 'center', marginTop: 20, marginHorizontal: "auto" },
    buttonText: { color: 'white', fontSize: 16 },
});

export default ChangePassword;
