import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from '../../context/UserContext';


const AccountInfoScreen = ({ route, navigation }) => {
    const { user, setUser } = useContext(UserContext);

    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [dob, setDob] = useState(user.dob ? new Date(user.dob) : null);
    const [selectedGender, setSelectedGender] = useState(user.gender || null);
    const [showPicker, setShowPicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        if (selectedDate) {
            setDob(selectedDate);
        }
        setShowPicker(false);
    };

    const handleUpdate = async () => {
        try {
            const updatedUser = {
                name,
                phone,
                dob: dob ? dob.toISOString().split('T')[0] : null, // Chuyển thành chuỗi yyyy-MM-dd
                gender: selectedGender,
            };

            const response = await axios.put(
                `https://67d07fbb825945773eb11f01.mockapi.io/api/signup/users/${user.id}`,
                updatedUser
            );
            // Lấy dữ liệu mới từ API
            const data = await axios.get(`https://67d07fbb825945773eb11f01.mockapi.io/api/signup/users/${user.id}`);
            const userNew = response.data;
            console.log(userNew)
            // Lưu vào AsyncStorage
            setUser(userNew);  // Cập nhật vào Context

            Alert.alert("Thành công", "Thông tin đã được cập nhật!");
        } catch (error) {
            Alert.alert("Lỗi", "Không thể cập nhật thông tin.");
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={20} color="green" />
                <Text style={styles.headerTitle}>ACCOUNT INFORMATION</Text>
            </TouchableOpacity>

            {/* Email */}
            <Text style={styles.sectionTitle}>Tài khoản của bạn là</Text>
            <TextInput style={styles.input} editable={false} value={user.email} />

            {/* Thông tin thêm */}
            <Text style={styles.sectionTitle}>Thông tin thêm</Text>
            <View style={styles.row}>
                <Text style={styles.label}>Họ tên</Text>
                <TextInput style={styles.value} value={name} onChangeText={setName} />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Ngày sinh</Text>
                <TouchableOpacity onPress={() => setShowPicker(true)}>
                    <Text style={styles.value}>
                        {dob ? dob.toLocaleDateString() : "Chọn ngày sinh"}
                    </Text>
                </TouchableOpacity>
                {showPicker && (
                    <DateTimePicker
                        value={dob || new Date()}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
            </View>
            {/* Giới tính */}
            <View style={styles.row}>
                <Text style={styles.label}>Giới tính</Text>
                <Picker selectedValue={selectedGender} onValueChange={(value) => setSelectedGender(value)} style={{ width: 120 }}>
                    <Picker.Item label="Chọn giới tính" value={null} />
                    <Picker.Item label="Nam" value="Nam" />
                    <Picker.Item label="Nữ" value="Nữ" />
                </Picker>
            </View>

            {/* Liên hệ */}
            <Text style={styles.sectionTitle}>Liên hệ</Text>
            <View style={styles.row}>
                <Text style={styles.label}>SDT di động</Text>
                <TextInput style={styles.value} value={phone} onChangeText={setPhone} />
            </View>

            {/* Nút cập nhật */}
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Cập nhật thông tin</Text>
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
        padding: 20,
        borderBottomWidth: 1,
        borderColor: "#D9D9D9",
        marginTop: 5,
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
        textAlign: 'right'
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
    }
});

export default AccountInfoScreen;
