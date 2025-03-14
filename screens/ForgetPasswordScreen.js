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
} from "react-native";

const ForgetPasswordScreen = () => {
    const [user, setUser] = useState("");


    const handleRegister = () => {
        console.log({ user });
    };
    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image source={require("../assets/img/banner.png")} style={styles.imageRegister} resizeMode="contain" />
                <View>
                    <Text style={styles.header}>
                        Lấy lại mật khẩu
                    </Text>
                </View>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập email hoặc số điện thoại"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        onChangeText={setUser}
                    />


                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Tiếp Tục</Text>
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
        alignItems: "center", // Căn giữa tất cả nội dung

    },
    container: {
        width: "85%", // Giới hạn chiều rộng
        alignItems: "center", // Căn giữa các input trong container
    },
    header: {
        fontSize: 20,
        fontWeight: 20
    },
    imageRegister: {
        // width: "100%",
        // height: "100%",
        marginBottom: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        marginBottom: 15,
        padding: 10,
        width: "100%", // Giúp căn lề trái trong khối trung tâm
    },
    dobAndGender: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    inputHalf: {
        width: "48%", // Giữ khoảng cách đồng đều giữa 2 ô nhập
    },
    note: {
        color: "red",
        fontStyle: "italic",
        marginBottom: 10,
        alignSelf: "flex-start", // Căn lề trái trong container
    },
    button: {
        backgroundColor: "#4CDE4C",
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        width: "80%", // Giảm độ rộng
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ForgetPasswordScreen;
