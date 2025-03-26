import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome5';

const API_URL = "http://10.0.2.2:8000/account/login";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Lỗi", "Vui lòng nhập email và mật khẩu");
            return;
        }
    
        setLoading(true);
        try {
            const response = await axios.post(API_URL, {
                email: email,
                mat_khau: password
            });
    
            setLoading(false);
            if (response.data.message === "Đăng nhập thành công!") {
                await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
                Alert.alert("Thành công", "Đăng nhập thành công!");
                navigation.navigate("Home");
            } else {
                Alert.alert("Lỗi", "Đăng nhập thất bại");
            }
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data.detail) {
                Alert.alert("Lỗi", error.response.data.detail);
            } else {
                Alert.alert("Lỗi", "Không thể kết nối đến máy chủ");
            }
            console.error(error);
        }
    };
    

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={() => navigation.navigate("Home")}>
                <View >
                    <Icon name="chevron-left" size={20} color="green" />
                </View>
                <Text style={styles.headerTitle}>ACCOUNT MEMBER</Text>
            </TouchableOpacity>
            <Image source={require("../assets/img/banner.png")} style={styles.banner} />

            <View style={styles.form}>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    placeholder="Mật khẩu"
                    secureTextEntry
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading}>
                    <Text style={styles.loginText}>
                        {loading ? "Đang đăng nhập..." : "ĐĂNG NHẬP"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text onPress={() => navigation.navigate("ForgetPassword")} style={styles.forgotPass}>
                        Quên mật khẩu?
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={styles.register}>
                    <Text style={{ fontSize: 14 }}>Đăng ký tài khoản</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
    banner: { width: "100%", height: 180, marginBottom: 30 },
    form: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20 },
    input: { width: "100%", borderBottomWidth: 1, borderColor: "#ccc", paddingVertical: 10, marginVertical: 10 },
    loginBtn: { width: "100%", backgroundColor: "#33DD33", padding: 15, alignItems: "center", borderRadius: 20, marginVertical: 10 },
    loginText: { color: "white", fontWeight: "bold" },
    forgotPass: { color: "#007bff", marginVertical: 15 },
    register: { marginTop: 30 },
});

export default LoginScreen;
