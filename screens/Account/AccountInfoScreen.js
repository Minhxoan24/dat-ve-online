import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';

const AccountInfoScreen = ({ navigation }) => {
    const [selectedGender, setSelectedGender] = useState('Nam');
    return (
        <View style={styles.container}>

            {/* Header */}
            <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
                <View >
                    <Icon name="chevron-left" size={20} color="green" />
                </View>
                <Text style={styles.headerTitle}>ACCOUNT INFORMATION</Text>

            </TouchableOpacity>

            {/* Tài khoản */}

            <Text style={styles.sectionTitle}>Tài khoản của bạn là</Text>
            <TextInput style={styles.input} editable={false} value="tigamichu********no1" />


            {/* Thông tin thêm */}

            <Text style={styles.sectionTitle}>Thông tin thêm</Text>
            <View style={styles.row}>
                <Text style={styles.label}>Họ tên</Text>
                <TextInput style={styles.value}>Nguyễn Văn A</TextInput>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Ngày sinh</Text>
                <TextInput style={styles.value}>8 Thg 10, 2004</TextInput>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Giới tính</Text>
                <TextInput style={styles.value}>Nam</TextInput>

            </View>


            {/* Liên hệ */}

            <Text style={styles.sectionTitle}>Liên hệ</Text>
            <View style={styles.row}>
                <Text style={styles.label}>SDT di động</Text>
                <TextInput style={styles.value}>038*****660</TextInput>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Tỉnh/Thành</Text>
                <TextInput style={styles.value}>Hà Nội</TextInput>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Quận/huyện</Text>
                <TextInput style={styles.value}>Quận Hai Bà Trưng</TextInput>
            </View>


            {/* Nút cập nhật và xóa */}
            <TouchableOpacity style={styles.updateButton}>
                <Text style={styles.buttonText}>Cập nhật thông tin</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.deleteText}>Xóa tài khoản</Text>
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
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
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
    deleteText: {
        textAlign: 'center',
        color: 'blue',
        marginTop: 10,
        fontSize: 14,
    },
});

export default AccountInfoScreen;
