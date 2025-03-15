import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from "axios"; // ✅ Thêm axios để gọi API



const CheckoutScreen = ({ route, navigation }) => {
    const { movie, selectedDay, selectedTime, selectedSeats, price } = route.params;
    const [loading, setLoading] = useState(false);
    const handlePayment = async () => {
        setLoading(true);
        try {

            const data = {
                movie: movie.title,
                date: selectedDay,
                price: price,
                seat: selectedSeats,
                hour: selectedTime,
            };
            console.log(data)
            // Gửi dữ liệu đặt vé lên MockAPI
            const response = await axios.post(
                "https://67d294a790e0670699be2f6a.mockapi.io/movie/Ticket",
                data
            );

            if (response.status === 201) {
                // Lấy danh sách ghế đã bị chiếm trước đó từ API
                const seatResponse = await axios.get("https://67d294a790e0670699be2f6a.mockapi.io/movie/seat");
                let occupiedSeats = seatResponse.data[0].occupiedSeats || [];
                const seatId = seatResponse.data[0].id;  // ID của dữ liệu ghế (ví dụ: "1")
                console.log(seatId)
                // Loại bỏ trùng lặp ghế trước khi cập nhật
                const updatedSeats = [...new Set([...occupiedSeats, ...selectedSeats])];
                console.log(updatedSeats)

                // Cập nhật lại danh sách ghế bị chiếm
                await axios.put(`https://67d294a790e0670699be2f6a.mockapi.io/movie/seat/${seatId}`, {
                    occupiedSeats: updatedSeats
                });

                setLoading(false);
                Alert.alert("Thành công", "Thanh toán thành công!", [
                    { text: "OK", onPress: () => navigation.navigate("Home") },
                ]);
            }
        } catch (error) {
            setLoading(false);
            console.error("Lỗi thanh toán:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại!");
        }
    };

    const ticketInfo = {


        discount: 0, // Giảm giá
        pointsUsed: 0,
        finalPrice: 250000,
    };

    return (
        <View style={styles.container}>
            {/* Tiêu đề */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.header}>
                <View onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={20} color="green" />
                </View>
                <Text style={styles.headerTitle}>Ticket Detail</Text>

            </TouchableOpacity>

            {/* Thông tin phim */}
            <View style={styles.card}>
                <Image source={{ uri: movie.image }} style={styles.movieImage} />
                <View style={styles.movieInfo}>
                    <Text style={styles.movieTitle}>{movie.title}</Text>

                    <Text style={styles.text}>Ngày {selectedDay}</Text>
                    <Text style={styles.text}>Thời lượng {movie.duration}</Text>
                    <Text style={styles.text}>Giờ chiếu {selectedTime}</Text>

                    <View >

                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            <Text style={styles.text}>Ghế ngồi :</Text>
                            {selectedSeats.map((seat, index) => (
                                <Text key={index} style={styles.text}>
                                    {seat}{index !== selectedSeats.length - 1 ? ", " : ""}
                                </Text>
                            ))}
                        </View>
                    </View>
                    <Text style={styles.totalPrice}>
                        Tổng thanh toán: {price.toLocaleString()}đ
                    </Text>
                </View>
            </View>

            {/* Thông tin vé */}

            <Text style={styles.sectionTitle}>THÔNG TIN VÉ</Text>
            <View style={styles.row}>
                <Text style={styles.label}>Số lượng</Text>
                <Text style={styles.value}>{selectedSeats.length}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Tổng</Text>
                <Text style={styles.value}>{price.toLocaleString()}đ</Text>
            </View>


            {/* Giảm giá */}

            <Text style={styles.sectionTitle}>GIẢM GIÁ</Text>
            <TouchableOpacity style={styles.row}>
                <Text style={styles.label}>Điểm thưởng</Text>
                <Icon name="chevron-right" size={16} color="gray" style={styles.value} />


            </TouchableOpacity>


            {/* Tổng kết */}

            <Text style={styles.sectionTitle}>TỔNG KẾT</Text>

            <View style={styles.row}>
                <Text style={styles.label}>Giảm giá</Text>
                <Text style={styles.value}>{ticketInfo.discount.toLocaleString()}đ</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Tổng cộng</Text>
                <Text style={styles.value}>{price.toLocaleString()}đ</Text>
            </View>



            {/* Nút thanh toán */}
            <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
                <Text style={styles.payButtonText}>{loading ? "Đang thanh toán..." : "Thanh Toán"}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D9D9D9",
        marginTop: 30,
    },
    header: {
        flexDirection: 'row',

        padding: 15,
        backgroundColor: 'white',
        elevation: 2,
        borderBottomWidth: 1,

        borderColor: "#D9D9D9",
    },
    headerTitle: {
        flex: 1,
        paddingLeft: 20,
        fontSize: 18,

    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 10,



        elevation: 3,
    },
    movieImage: {
        width: 80,
        height: 120,
        borderRadius: 8,
    },
    movieInfo: {
        flex: 1,
        marginLeft: 10,
    },
    movieTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    text: {
        fontSize: 14,
        color: "#555",
        paddingVertical: 5,
    },
    totalPrice: {
        fontSize: 14,
        fontWeight: "bold",
        color: "red",
        marginTop: 5,
    },

    sectionTitle: {
        fontSize: 14,
        color: 'gray',
        padding: 10,
        paddingBottom: 10,


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
        fontSize: 14,
        color: "#555",
    },
    value: {
        fontSize: 14,
        fontWeight: "bold",
    },
    arrow: {
        color: "#007bff",
        fontSize: 16,
        fontWeight: "bold",
    },
    payButton: {
        backgroundColor: "#e91e63",
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: "center",
        marginTop: 20,
        marginHorizontal: 20,
    },
    payButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default CheckoutScreen;
