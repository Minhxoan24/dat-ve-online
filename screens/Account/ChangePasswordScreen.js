import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';

const ChangePassword = ({ navigation }) => {

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

            <Text style={styles.sectionTitle}>MẬT KHẨU ĐĂNG NHẬP</Text>
            <View style={styles.row}>
                <TextInput style={styles.input} placeholder="Mật khẩu hiện tại" />
                <TouchableOpacity>
                    <Icon name="eye-slash" size={20} color="gray" />

                </TouchableOpacity>

            </View>
            <View style={styles.row}>
                <TextInput style={styles.input} placeholder="Mật khẩu mới" />
                <TouchableOpacity>
                    <Icon name="eye-slash" size={20} color="gray" />

                </TouchableOpacity>

            </View>
            <View style={styles.row}>
                <TextInput style={styles.input} placeholder="Xác nhân mật khẩu mới" />
                <TouchableOpacity>
                    <Icon name="eye-slash" size={20} color="gray" />

                </TouchableOpacity>

            </View>







            {/* Nút cập nhật và xóa */}
            <TouchableOpacity style={styles.updateButton}>
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
