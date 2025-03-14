import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';


const MyTicketsScreen = ({ navigation }) => {
    const [selectedTab, setSelectedTab] = useState("upcoming"); // "upcoming" hoặc "watched"

    // Dữ liệu mẫu
    const upcomingTickets = [
        {
            id: "1",
            title: "Linh miêu",
            date: "16/03/2025 | 21:30",
            location: "Jack Hồ Gươm",
            price: "250.000đ",
            points: 7500,
            expire: "16/09/2025",
        },
    ];

    const watchedTickets = [
        {
            id: "2",
            title: "Bộ tứ báo thù",
            date: "01/02/2025 | 21:30",
            location: "Jack Hồ Gươm",
            price: "150.000đ",
            points: 4500,
            expire: "01/08/2025",
        },
    ];

    return (
        <View style={styles.container}>

            {/* Header */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.header}>
                <View onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={20} color="green" />
                </View>
                <Text style={styles.headerTitle}>MY TICKET</Text>

            </TouchableOpacity>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === "upcoming" && styles.activeTab]}
                    onPress={() => setSelectedTab("upcoming")}
                >
                    <Text style={[styles.tabText, selectedTab === "upcoming" && styles.activeTabText]}>
                        Phim sắp xem
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === "watched" && styles.activeTab]}
                    onPress={() => setSelectedTab("watched")}
                >
                    <Text style={[styles.tabText, selectedTab === "watched" && styles.activeTabText]}>
                        Phim đã xem
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Danh sách vé */}
            <FlatList
                data={selectedTab === "upcoming" ? upcomingTickets : watchedTickets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.ticketCard} onPress={() => navigation.navigate("TicketDetail")}>
                        <View style={styles.ticketLeft}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.details}>{item.date}</Text>
                            <Text style={styles.details}>{item.location}</Text>
                        </View>
                        <View style={styles.ticketRight}>
                            <Text style={styles.price}>{item.price}</Text>
                            <Text>Điểm tích lũy: </Text>
                            <Text style={styles.points}>{item.points}</Text>
                            <Text>hời hạn điểm: </Text>

                            <Text style={styles.expire}>T{item.expire}</Text>

                        </View>


                    </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>Không có vé</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
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
    tabContainer: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#fff",
        alignItems: "center",


    },
    tab: {

        width: "50%",
        borderBottomWidth: 2,
        borderBottomColor: "transparent",
        paddingVertical: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    activeTab: {
        borderBottomColor: "#28a745",
    },
    tabText: {
        fontSize: 16,
        color: "#888",
    },
    activeTabText: {
        color: "#28a745",
        fontWeight: "bold",
    },
    ticketCard: {
        backgroundColor: "#fff",

        marginHorizontal: 10,
        marginVertical: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 3,
        flexDirection: "row",
        justifyContent: "space-between",


    },
    ticketLeft: {
        marginHorizontal: 30,
        marginVertical: 20,
    },
    ticketRight: {
        marginHorizontal: 30,

        borderLeftWidth: 2,
        borderColor: "#D9D9D9",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 20

    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 20,

    },
    details: {
        fontSize: 14,
        color: "#666",
    },
    price: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#28a745",
        marginVertical: 20,

    },
    points: {
        fontSize: 14,
        color: "#ff9900",
        marginVertical: 10,

    },
    expire: {
        fontSize: 12,
        color: "red",
        paddingLeft: 10,

    },
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        color: "#888",
        marginTop: 20,
    },
});

export default MyTicketsScreen;
