import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    Platform,
    Alert
} from "react-native";


import axios from "axios";

import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/FontAwesome5';



const API_URL = "https://67d07fbb825945773eb11f01.mockapi.io/api/signup/users";


const SignupScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState(new Date()); // Dữ liệu ngày sinh
    const [gender, setGender] = useState(""); // Dữ liệu giới tính


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!email || !password || !phone || !name) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ tên, email, số điện thoại và mật khẩu");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(API_URL, {
                name,
                phone,
                email,
                password
            });

            setLoading(false);
            Alert.alert("Thành công", "Đăng ký thành công!");
            navigation.navigate("Login"); // Chuyển đến trang 
        } catch (error) {
            setLoading(false);
            Alert.alert("Lỗi", "Không thể kết nối đến máy chủ");
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image source={require("../assets/img/banner.png")} style={styles.imageRegister} resizeMode="contain" />
                <View style={styles.container}>
                    <TextInput style={styles.input} placeholder="Họ tên" onChangeText={setName} />
                    <TextInput style={styles.input} placeholder="Số điện thoại" keyboardType="phone-pad" onChangeText={setPhone} />
                    <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" onChangeText={setEmail} />
                    <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry onChangeText={setPassword} />

                    {/* Chọn ngày sinh */}
                    <View style={{ flexDirection: "row", alignItems: "" }}>
                        <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={[styles.input, styles.inputHalf]}>
                            <Text style={styles.dateText}>{dob.toLocaleDateString()}</Text>
                        </TouchableOpacity>

                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={(date) => {
                                setDob(date);
                                setDatePickerVisibility(false);
                            }}
                            onCancel={() => setDatePickerVisibility(false)}
                        />

                        {/* Chọn giới tính */}
                        <View style={[styles.input, styles.inputHalf]}>
                            <Picker selectedValue={gender} onValueChange={(value) => setGender(value)}>
                                <Picker.Item label="Chọn giới tính" value="" />
                                <Picker.Item label="Nam" value="Nam" />
                                <Picker.Item label="Nữ" value="Nữ" />
                            </Picker>
                        </View>

                    </View>


                    <Text style={styles.note}>* Thông tin bắt buộc</Text>
                    <TouchableOpacity style={styles.button} onPress={handleSignup}>
                        <Text style={styles.loginText}>{loading ? "Đang đăng ký..." : "ĐĂNG KÝ"}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    safeContainer: { flex: 1, backgroundColor: "#fff" },
    scrollContainer: { alignItems: "center" },
    container: { width: "85%", alignItems: "center" },
    imageRegister: { marginBottom: 30 },
    input: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        marginBottom: 15,
        padding: 10,
        width: "100%",
    },
    dobAndGender: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
    inputHalf: { width: "50%", justifyContent: "center" },
    dateText: { color: "#000", textAlign: "left" },
    note: { color: "red", fontStyle: "italic", marginBottom: 10, alignSelf: "flex-start" },
    button: { backgroundColor: "#4CDE4C", paddingVertical: 12, borderRadius: 30, alignItems: "center", width: "80%", marginTop: 20 },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default SignupScreen;
