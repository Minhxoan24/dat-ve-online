import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, StatusBar } from "react-native";
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

const SelectSeat = ({ route, navigation }) => {
    const { movie, selectedDay, selectedTime } = route.params;
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [occupiedSeats, setOccupiedSeats] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(0)).current; // Animation value for sliding

    // Fetch occupied seats from API
    useEffect(() => {
        const fetchOccupiedSeats = async () => {
            try {
                const response = await axios.get("https://67d294a790e0670699be2f6a.mockapi.io/movie/seat");
                if (response.data.length > 0) {
                    setOccupiedSeats(response.data[0].occupiedSeats || []);
                }
            } catch (error) {
                console.error("Error fetching occupied seats:", error);
            }
        };
        fetchOccupiedSeats();
    }, []);

    const toggleSeat = (seat) => {
        if (occupiedSeats.includes(seat)) return;

        let updatedSeats;
        if (selectedSeats.includes(seat)) {
            updatedSeats = selectedSeats.filter((s) => s !== seat);
        } else {
            updatedSeats = [...selectedSeats, seat];
        }
        setSelectedSeats(updatedSeats);

        // Show modal if there are selected seats
        if (!isModalVisible) {
            setIsModalVisible(true);
            slideInModal();
        }
    };

    const slideInModal = () => {
        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const slideOutModal = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setIsModalVisible(false));
    };

    const totalPrice = selectedSeats.length * 150000;

    const renderSeats = () => {
        return rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
                {row.map((seat, index) => {
                    const isSelected = selectedSeats.includes(seat);
                    const isOccupied = occupiedSeats.includes(seat);
                    const isSweetBox = rowIndex === rows.length - 1;

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
                            disabled={isOccupied}
                        >
                            {isOccupied ? <Icon name="window-close" size={30} color="white" /> : (
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
            <StatusBar translucent backgroundColor="black" barStyle="dark-content" />

            {/* Header */}
            <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={20} color="green" />
                <Text style={styles.headerTitle}>Đặt vé</Text>
            </TouchableOpacity>

            {/* Screen */}
            <View style={styles.screen}>
                <Text style={styles.screenText}>Màn hình</Text>
            </View>

            {/* Seats */}
            <ScrollView contentContainerStyle={styles.seatContainer}>{renderSeats()}</ScrollView>

            {/* Legend */}
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
                        <View style={[styles.box]}>
                            <Icon name="window-close" size={60} color="white" />
                        </View>
                        <Text style={styles.legendText}>Ghế đã đặt</Text>
                    </View>
                </View>
            </View>

            {/* Animated Modal */}
            {isModalVisible && (
                <Animated.View
                    style={[
                        styles.animatedModal,
                        {
                            transform: [
                                {
                                    translateY: slideAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [300, 0], // Slide from bottom to top
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalText}>
                            <View style={styles.modalTitle}>
                                <View style={styles.modalMovie}>
                                    <Text style={styles.movieTitle}>{movie.title}</Text>
                                    <Text style={styles.movieSubtitle}>{selectedDay} {selectedTime}</Text>
                                </View>
                                <View style={styles.selectedSeatsContainer}>
                                    {selectedSeats.map((seat, index) => (
                                        <View key={index} style={styles.seatTag}>
                                            <Text style={styles.seatTagText}>{seat}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                            <Text style={styles.price}>{totalPrice.toLocaleString()} đ</Text>
                            <Text style={styles.ticketCount}>{selectedSeats.length} ghế</Text>
                        </View>
                        <TouchableOpacity style={styles.closeButton} onPress={slideOutModal}>
                            <Icon name="times" size={20} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bookButton}
                            onPress={() => {
                                slideOutModal();
                                navigation.navigate("Checkout", {
                                    movie: movie,
                                    selectedDay: selectedDay,
                                    selectedTime: selectedTime,
                                    selectedSeats: selectedSeats,
                                    price: totalPrice,
                                });
                            }}
                        >
                            <Text style={styles.bookButtonText}>Đặt vé</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}
        </View>
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
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        color: "white",
        paddingLeft: 10,
        fontFamily: "Roboto", // Added font family
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
        fontSize: 14,
        fontFamily: "Roboto", // Added font family
    },
    seatContainer: {
        alignItems: "center",
        zIndex: 6,
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 5,
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
        backgroundColor: "#4CDE4C",
    },
    sweetBoxSeat: {
        backgroundColor: "#FF4081",
    },
    occupiedSeat: {
        backgroundColor: "black",
    },
    seatText: {
        fontSize: 12,
        fontWeight: "bold",
        fontFamily: "Roboto", // Added font family
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
        borderRadius: 3,
    },
    legendText: {
        color: "white",
        fontSize: 12,
        fontFamily: "Roboto", // Added font family
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
        alignItems: "center",
        paddingHorizontal: 5
    },
    modalTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: "bold",
        flexWrap: "wrap",
        fontFamily: "Roboto", // Added font family
    },
    movieSubtitle: {
        fontSize: 14,
        color: "gray",
        marginBottom: 10,
        fontFamily: "Roboto", // Added font family
    },
    selectedSeatsContainer: {
        flexDirection: "row",
        flexWrap: "wrap", // Allow wrapping to the next line
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
        fontFamily: "Roboto", // Added font family
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        fontFamily: "Roboto", // Added font family
    },
    ticketCount: {
        fontSize: 14,
        color: "gray",
        fontFamily: "Roboto", // Added font family
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
        fontFamily: "Roboto", // Added font family
    },
    closeButton: {
        position: "absolute",
        top: -5,
        right: 10,
        padding: 0,
    },
    animatedModal: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        elevation: 5,
    },
});

export default SelectSeat;
