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
    Alert,
} from "react-native";
import axios from "axios";

const API_URL = "http://10.0.2.2:8000/account/forgotpassword";

const ForgetPasswordScreen = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async () => {
        if (!email) {
            Alert.alert("Lỗi", "Vui lòng nhập email của bạn");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(API_URL, { email });

            setLoading(false);
            Alert.alert("Mật khẩu của bạn", `Mật khẩu: ${response.data}`);
        } catch (error) {
            setLoading(false);
            Alert.alert("Lỗi", error.response?.data?.detail || "Không thể kết nối đến máy chủ");
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image source={require("../assets/img/banner.png")} style={styles.imageRegister} resizeMode="contain" />
                <View>
                    <Text style={styles.header}>Lấy lại mật khẩu</Text>
                </View>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập email"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    <TouchableOpacity style={styles.button} onPress={handleForgotPassword} disabled={loading}>
                        <Text style={styles.buttonText}>
                            {loading ? "Đang xử lý..." : "Tiếp Tục"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContainer: {
        alignItems: "center",
    },
    container: {
        width: "85%",
        alignItems: "center",
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },
    imageRegister: {
        marginBottom: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        marginBottom: 15,
        padding: 10,
        width: "100%",
    },
    button: {
        backgroundColor: "#4CDE4C",
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ForgetPasswordScreen;
