import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';


const TicketDetail = ({ navigation }) => {
    const ticketInfo = {
        movie: "Linh miêu",
        type: "C18 | 2D Phụ đề | 109 phút",
        cinema: "Jack Hồ Gươm",
        date: "16/03/2025",
        time: "21:30",
        seats: ["A1", "A2", "A3"], // Danh sách ghế
        payment: "Momo",
        total: "250.000đ",
        points: 7500,
        expiry: "16/09/2025",
        barcode: "7589023168141122",
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.header}>
                <View onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={20} color="green" />
                </View>
                <Text style={styles.headerTitle}>Ticket Detail</Text>

            </TouchableOpacity>

            {/* Thông tin phim */}
            <View style={styles.card}>
                <Text style={styles.movieTitle}>{ticketInfo.movie}</Text>
                <Text style={styles.movieType}>{ticketInfo.type}</Text>
            </View>

            {/* Thông tin đặt vé */}
            <View style={styles.cardInfo}>
                <View style={styles.cardLeft}>
                    <Text style={styles.label}>Rạp chiếu</Text>
                    <Text style={styles.label}>Ngày chiếu</Text>
                    <Text style={styles.label}>Giờ chiếu</Text>
                    <Text style={styles.label}>Ghế ngồi</Text>
                </View>
                <View style={styles.cardRight}>
                    <Text style={styles.value}>{ticketInfo.cinema}</Text>
                    <Text style={styles.value}>{ticketInfo.date}</Text>
                    <Text style={styles.value}>{ticketInfo.time}</Text>
                    <Text style={styles.value}>{ticketInfo.seats.join(", ")}</Text>
                </View>


            </View>

            {/* Thông tin thanh toán */}
            <View style={styles.cardTotal}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={styles.paymentMethod}>{ticketInfo.payment}</Text>
                    <Text style={styles.label}>Thanh toán</Text>

                </View>
                <View style={styles.totalMoney}>
                    <Text style={styles.label}>Tổng tiền</Text>
                    <Text style={styles.total}>{ticketInfo.total}</Text>
                    <Text style={styles.label}>Điểm tích lũy</Text>
                    <Text style={styles.points}>{ticketInfo.points}</Text>
                    <Text style={styles.label}>Thời hạn điểm</Text>
                    <Text style={styles.expiry}>{ticketInfo.expiry}</Text>
                </View>
            </View>

            {/* Mã vạch */}
            <View style={styles.cardInfo}>
                <Image source={{ uri: "https://barcode.tec-it.com/barcode.ashx?data=" + ticketInfo.barcode }} style={styles.barcode} />

            </View>

            {/* Lưu ý */}
            <Text style={styles.note}>Lưu ý: Vui lòng đưa mã số này đến quầy vé để nhận vé.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        marginTop: 30,
    },
    header: {
        flexDirection: 'row',

        padding: 15,
        backgroundColor: 'white',
        elevation: 2,
        borderBottomWidth: 1,
        marginBottom: 10,
        borderColor: "#D9D9D9",
    },
    headerTitle: {
        flex: 1,
        paddingLeft: 20,
        fontSize: 18,

    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        marginHorizontal: 10,

        borderBottomWidth: 2,
        borderColor: "#D9D9D9",
        justifyContent: "center",
        alignItems: "center",


        elevation: 3,
    },
    cardInfo: {
        backgroundColor: "#fff",
        padding: 15,
        marginHorizontal: 10,

        borderBottomWidth: 2,
        borderColor: "#D9D9D9",
        justifyContent: "center",
        alignItems: "center",

        flexDirection: 'row',
        justifyContent: "flex-start",
        elevation: 3,

    },
    cardLeft: {
        paddingHorizontal: 20
    },
    movieTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    movieType: {
        color: "gray",
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 5,
    },
    value: {
        fontWeight: "bold",
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 5,
    },
    cardRow: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardTotal: {
        backgroundColor: "#fff",

        marginHorizontal: 10,

        borderBottomWidth: 2,
        borderColor: "#D9D9D9",
        justifyContent: "center",
        alignItems: "center",

        flexDirection: 'row',
        justifyContent: "flex-start",
        elevation: 3,

    },
    totalMoney: {
        flex: 1, alignItems: "center", justifyContent: "center",
        borderLeftWidth: 2,
        borderColor: "#D9D9D9",
        marginLeft: 100,
        padding: 15,
    },
    paymentMethod: {
        fontSize: 16,
        fontWeight: "bold",
        paddingHorizontal: 20,
        marginLeft: 15
    },
    total: {
        color: "green",
        fontWeight: "bold",
        fontSize: 16,
    },
    points: {
        color: "red",
        fontWeight: "bold",
    },
    expiry: {
        color: "red",
    },
    barcodeContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    barcode: {
        paddingVertical: 20,
        width: "100%",
        height: 100,
        resizeMode: "contain",
    },
    barcodeText: {
        fontSize: 16,
        marginTop: 5,
    },
    note: {
        textAlign: "center",
        color: "red",
        fontSize: 12,
        fontWeight: "600",
        marginTop: 30,
    },
});

export default TicketDetail;
