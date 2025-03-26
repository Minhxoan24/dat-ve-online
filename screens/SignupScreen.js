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
    Alert
} from "react-native";

import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const API_BASE_URL = "http://10.0.2.2:8000/account";

const SignupScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState(null);
    const [gender, setGender] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!email || !password || !phone || !name) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, {
                email,
                mat_khau: password,
                sdt: phone,
                gioi_tinh: gender === "Nam" ? true : gender === "Nữ" ? false : null,
                ngay_sinh: dob ? dob.toISOString().split("T")[0] : null, // YYYY-MM-DD
                dia_chi: "Chưa cập nhật", // Giá trị mặc định
                ten: name
            });

            setLoading(false);
            Alert.alert("Thành công", "Đăng ký thành công!");
            navigation.navigate("Login");
        } catch (error) {
            setLoading(false);
            console.error(error);
            Alert.alert("Lỗi", error.response?.data?.detail || "Không thể kết nối đến máy chủ");
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
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={[styles.input, styles.inputHalf]}>
                            <Text style={styles.dateText}>{dob ? dob.toLocaleDateString() : "Chọn ngày sinh"}</Text>
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
                        <Text style={styles.buttonText}>{loading ? "Đang đăng ký..." : "ĐĂNG KÝ"}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
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
