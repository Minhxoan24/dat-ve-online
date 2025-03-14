import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";

const rows = [
    ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    ["B1", "B2", "B3", "B4", "B5", "B6", "B7",],
    ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
    ["D1", "D2", "D3", "D4", "D5", "D6", "D7",],
    ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8"],
    ["F1", "F2", "F3", "F4", "F5", "F6", "F7",],
    ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8"],
    ["H1", "H2", "H3", "H4",],



];


//  Giả sử đây là ghế đã được đặt từ API

const ticketPrice = 150000; // Giá vé cố định

const SelectSeat = ({ route, navigation }) => {
    const { movie, selectedDay, selectedTime } = route.params;
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [occupiedSeats, setOccupiedSeats] = useState([]); // Lưu danh sách ghế đã đặt từ API

    // Gọi API để lấy danh sách ghế đã đặt
    useEffect(() => {
        const fetchOccupiedSeats = async () => {
            try {
                const response = await axios.get("https://67d294a790e0670699be2f6a.mockapi.io/movie/seat");
                if (response.data.length > 0) {
                    setOccupiedSeats(response.data[0].occupiedSeats || []);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách ghế đã đặt:", error);
            }
        };
        fetchOccupiedSeats();
    }, []);

    const toggleSeat = (seat) => {
        let updatedSeats;
        if (occupiedSeats.includes(seat)) return; // Không cho chọn ghế đã đặt

        if (selectedSeats.includes(seat)) {
            updatedSeats = (selectedSeats.filter((s) => s !== seat));
        } else {

            updatedSeats = [...selectedSeats, seat];
        }
        setSelectedSeats(updatedSeats);

        // Hiện modal nếu có ghế được chọn
        setModalVisible(updatedSeats.length > 0);
    };

    // Hàm tính tổng tiền
    const totalPrice = selectedSeats.length * ticketPrice;

    const renderSeats = () => {
        return rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
                {row.map((seat, index) => {
                    const isSelected = selectedSeats.includes(seat);
                    const isOccupied = occupiedSeats.includes(seat);
                    const isSweetBox = rowIndex === rows.length - 1; // Sweet Box ở hàng cuối

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.seat,
                                isOccupied ? styles.occupiedSeat :
                                    isSelected ? styles.selectedSeat :
                                        isSweetBox ? styles.sweetBoxSeat : null,
                            ]}
                            onPress={() => toggleSeat(seat)}
                            disabled={isOccupied} // Vô hiệu hóa ghế đã đặt
                        >
                            {isOccupied ? <Icon name="window-close" size={30} color="white" backgroundColor="black" /> : (
                                <Text style={styles.seatText}>{seat}</Text>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={20} color="green" />
                <Text style={styles.headerTitle}>Đặt vé</Text>
            </TouchableOpacity>

            {/* Màn hình */}
            <View style={styles.screen}>
                <Text style={styles.screenText}>Màn hình</Text>
            </View>

            {/* Ghế ngồi */}
            <ScrollView contentContainerStyle={styles.seatContainer}>{renderSeats()}</ScrollView>

            {/* Chú thích */}
            <View style={styles.legend}>
                <View>
                    <View style={styles.legendItem}>
                        <View style={[styles.box, { backgroundColor: "white" }]} />
                        <Text style={styles.legendText}>Ghế trống</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.box, { backgroundColor: "#4CDE4C" }]} />
                        <Text style={styles.legendText}>Ghế đang đặt</Text>
                    </View>
                </View>

                <View>
                    <View style={styles.legendItem}>
                        <View style={[styles.box, { backgroundColor: "#FF4081" }]} />
                        <Text style={styles.legendText}>Sweet Box</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.box, { borderColor: "black", borderWidth: 2 }]}>
                            <Icon name="window-close" size={60} color="white" />
                        </View>
                        <Text style={styles.legendText}>Ghế đã đặt</Text>
                    </View>
                </View>


            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity style={{ height: 500, }} onPress={() => setModalVisible(false)} >

                </TouchableOpacity>
                <View style={styles.modalContainer} pointerEvents="box-none">

                    <View style={styles.modalContent}>
                        <View style={styles.modalText}>
                            <View style={styles.modalTitle}>
                                <View style={styles.modalMovie}>
                                    {/* Tên phim */}
                                    <Text style={styles.movieTitle}>{movie.title}</Text>
                                    <Text style={styles.movieSubtitle}>{selectedDay} {selectedTime}</Text>
                                </View>


                                {/* Vị trí ghế */}
                                <View style={styles.selectedSeatsContainer}>
                                    {selectedSeats.map((seat, index) => (
                                        <View key={index} style={styles.seatTag}>
                                            <Text style={styles.seatTagText}>{seat}</Text>
                                        </View>
                                    ))}
                                </View>

                            </View>


                            {/* Giá vé */}
                            <Text style={styles.price}>{totalPrice.toLocaleString()} đ</Text>
                            <Text style={styles.ticketCount}>{selectedSeats.length} ghế</Text>
                        </View>


                        {/* Nút đặt vé */}


                        {/* Nút đóng modal */}
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Icon name="times" size={20} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bookButton} onPress={() => {
                            setModalVisible(false);
                            navigation.navigate("Checkout", {
                                movie: movie,
                                selectedDay: selectedDay,
                                selectedTime: selectedTime,
                                selectedSeats: selectedSeats,
                                price: totalPrice
                            });
                        }
                        }>
                            <Text style={styles.bookButtonText}>Đặt vé</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal >
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        padding: 20,
        marginTop: 30,
        justifyContent: "center",

    },

    header: {
        flexDirection: "row",
        alignItems: "center",

        marginBottom: 20
    },

    headerTitle: {
        fontSize: 18,
        color: "white",
        paddingLeft: 10
    },

    screen: {
        height: 30,
        backgroundColor: "gray",
        marginBottom: 40,
        alignItems: "center",
        justifyContent: "center",
        borderTopLeftRadius: 30,  // Bo góc trái trên
        borderTopRightRadius: 30,  // Bo góc phải trên
    },

    screenText: {
        color: "white",
        fontSize: 14
    },

    seatContainer: {
        alignItems: "center",
        zIndex: 6,

    },

    row: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 5
    },

    seat: {
        width: 30,
        height: 30,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        margin: 3,
        borderRadius: 5,
    },

    selectedSeat: {
        backgroundColor: "#4CDE4C"
    },

    sweetBoxSeat: {
        backgroundColor: "#FF4081",

    },
    occupiedSeat: {
        backgroundColor: "black"
    },

    seatText: {
        fontSize: 12,
        fontWeight: "bold"
    },

    legend: {
        flexDirection: "row",
        justifyContent: "center",

        flexWrap: "wrap",

        marginBottom: 100,
    },

    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        margin: 10,

    },

    box: {
        width: 60,
        height: 60,
        marginRight: 5,
        borderRadius: 3
    },

    legendText: {
        color: "white",
        fontSize: 12
    },
    modalContainer: {
        flex: 1,
        zIndex: 5,
        justifyContent: "flex-end",
        pointerEvents: "box-none", // Cho phép bấm vào nút chọn ghế


    },

    modalContent: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"


    },
    modalTitle: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },

    movieTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },

    movieSubtitle: {
        fontSize: 14,
        color: "gray",
        marginBottom: 10,
    },

    selectedSeatsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
    },

    seatTag: {
        backgroundColor: "#D1FFD1",
        borderRadius: 5,
        padding: 5,
        margin: 2,

    },

    seatTagText: {
        fontSize: 12,
        fontWeight: "bold",
        color: "black",
    },

    price: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
    },

    ticketCount: {
        fontSize: 14,
        color: "gray",
    },

    bookButton: {
        backgroundColor: "#4CDE4C",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        paddingVertical: 10,
        marginRight: 20,
        position: "absolute",
        right: 10,

    },

    bookButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        paddingHorizontal: 30,



    },

    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
    },
});


export default SelectSeat;
