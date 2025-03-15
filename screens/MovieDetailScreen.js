

// export default MovieDetail;
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Alert } from "react-native"; // Import Alert để hiển thị thông báo




const MovieDetail = ({ route, navigation }) => {
    const { movie } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState([]);

    const handleSelect = async (time) => {
        try {
            const userData = await AsyncStorage.getItem("user");
            console.log(userData)

            if (!userData) {
                // Nếu chưa đăng nhập, hiển thị cảnh báo và chuyển sang trang đăng nhập
                Alert.alert(
                    "Thông báo",
                    "Bạn cần đăng nhập để đặt vé.",
                    [
                        { text: "Đăng nhập", onPress: () => navigation.navigate("Login") },
                        { text: "Hủy", style: "cancel" }
                    ]
                );
                return;
            }

            // Nếu đã đăng nhập, chuyển sang trang chọn ghế
            setModalVisible(false);
            navigation.navigate("SelectSeat", {
                movie: movie,
                selectedDay: selectedDay,
                selectedTime: time,
            });
        } catch (error) {
            console.error("Lỗi khi kiểm tra đăng nhập:", error);
        }
    };

    useEffect(() => {
        console.log((movie.date))
        generateWeek();
    }, []);

    // Tạo danh sách ngày trong tuần
    const generateWeek = () => {
        const today = new Date();
        let weekDays = [];

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);
            let formattedDate = currentDate.toISOString().split('T')[0]; // Lấy định dạng YYYY-MM-DD

            weekDays.push({
                day: getWeekday(currentDate.getDay()), // Lấy tên thứ
                date: formattedDate,
                hasMovie: movie.date.some(d => d.day === formattedDate) // Kiểm tra xem có phim không
            });
        }

        setAvailableDates(weekDays);
        // Mặc định chọn ngày đầu tiên có phim
        const firstAvailableDate = weekDays.find(d => d.hasMovie);
        if (firstAvailableDate) {
            setSelectedDay(firstAvailableDate.date);
            updateTimes(firstAvailableDate.date);
        }
    };

    // Lấy tên thứ trong tuần
    const getWeekday = (dayIndex) => {
        const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        return days[dayIndex];
    };

    // Cập nhật giờ chiếu khi chọn ngày
    const updateTimes = (selectedDate) => {
        const foundDate = movie.date.find(d => d.day === selectedDate);
        setSelectedTimes(foundDate ? foundDate.hours : []);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
                <View >
                    <Icon name="chevron-left" size={20} color="green" />
                </View>
                <Text style={styles.headerTitle}>ACCOUNT GIFT</Text>

            </TouchableOpacity>

            <Image source={{ uri: movie.image }} style={styles.movieImage} />

            <View style={styles.infoContainer}>
                <View style={styles.head}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <TouchableOpacity style={styles.confirm} onPress={() => setModalVisible(true)}>
                        <Text style={styles.confirmText}>ĐẶT VÉ</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Mô tả phim</Text>
                <Text style={styles.description}>{movie.description}</Text>
            </View>

            {/* Modal đặt vé */}
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <TouchableOpacity style={{ height: 350 }} onPress={() => setModalVisible(false)} />
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{movie.title}</Text>

                        {/* Hiển thị danh sách ngày */}
                        <View style={styles.daysContainer}>
                            {availableDates.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.dayItem,
                                        selectedDay === item.date ? styles.activeDayItem : null
                                    ]}
                                    onPress={() => {
                                        setSelectedDay(item.date);
                                        updateTimes(item.date);
                                    }}
                                >
                                    <Text style={styles.dayText}>{item.day}</Text>
                                    <Text style={[
                                        styles.dateText,
                                        selectedDay === item.date ? styles.activeDateText : null
                                    ]}>
                                        {item.date.split('-')[2]}
                                    </Text>
                                    {item.hasMovie && <View style={styles.dot} />}
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.dateTimeText}>Ngày {selectedDay}</Text>

                        {/* Hiển thị giờ chiếu */}
                        <View style={styles.timesContainer}>
                            {selectedTimes.length > 0 ? (
                                selectedTimes.map((time, index) => (
                                    <TouchableOpacity key={index} style={styles.timeButton} onPress={() => handleSelect(time)}>
                                        <Text style={styles.timeText}>{time}</Text>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <Text style={styles.noShowtimes}>Không có suất chiếu</Text>
                            )}
                        </View>

                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        backgroundColor: '#F6F6F6',
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
    backButton: {
        padding: 15,
    },
    backButtonText: {
        fontSize: 16,
        color: 'green',
        fontWeight: 'bold',
    },
    movieImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    infoContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 5,
    },
    head: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    confirm: {
        backgroundColor: "#98FB98",
        width: 150,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    confirmText: {
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
    modalContainer: {
        flex: 1,

    },
    modalContent: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    dayItem: {
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 5,
    },
    activeDayItem: {
        backgroundColor: '#98FB98',
        borderRadius: 50,
        paddingHorizontal: 10,
        paddingVertical: 5,

    },
    dayText: {
        fontSize: 12,
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    activeDateText: {
        color: 'white',

    },
    dateTimeText: {
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    timesContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        marginVertical: 10,
    },
    timeButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginRight: 10,
        marginBottom: 10,
    },
    timeText: {
        fontSize: 14,
    },
    closeButton: {
        backgroundColor: '#f0f0f0',
        width: "100%",
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
        position: "absolute",
        bottom: 20,
        left: 20,
    },
    closeButtonText: {
        fontWeight: 'bold',
    },
    dot: {
        width: 6,
        height: 6,
        backgroundColor: 'red',
        borderRadius: 3,
        position: 'absolute',
        bottom: 1,
    },
});

export default MovieDetail;
