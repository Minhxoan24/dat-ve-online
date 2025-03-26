import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage";


const HomeScreen = ({ navigation }) => {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const slideAnim = useState(new Animated.Value(-300))[0]; // Menu trượt từ phải vào
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [selectedTab, setSelectedTab] = useState("Đang Chiếu");

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await AsyncStorage.getItem("user");
            if (userData) {
                setUser(JSON.parse(userData));
            }
        };
        fetchUser();
    }, []);

    const handleUserPress = () => {
        console.log(user)
        if (user) {
            navigation.navigate("Account", { user: user });
        } else {
            navigation.navigate("Login");
        }
    };

    useEffect(() => {
        axios.get('https://67d07fbb825945773eb11f01.mockapi.io/api/signup/movies')
            .then(response => {
                setMovies(response.data);
                setUpcomingMovies(response.data);
            })
            .catch(error => {
                console.error('Lỗi khi lấy dữ liệu:', error);
            });
    }, []);

    const toggleMenu = () => {
        if (menuVisible) {
            Animated.timing(slideAnim, {
                toValue: -300, // Ẩn menu
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start(() => setMenuVisible(false));
        } else {
            setMenuVisible(true);
            Animated.timing(slideAnim, {
                toValue: 0, // Hiện menu
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start();
        }
    };

    const closeMenuIfNeeded = () => {
        if (menuVisible) {
            toggleMenu(); // Đóng menu nếu đang mở
        }
    };
    const handleLogout = async () => {
        await AsyncStorage.removeItem("user"); // Xoá thông tin tài khoản
        navigation.replace("Home"); // Chuyển về màn hình đăng nhập
    };

    return (
        <TouchableWithoutFeedback onPress={closeMenuIfNeeded}>
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="white" barStyle="dark-content" />
                <View style={styles.navicon}>
                    <TouchableOpacity onPress={handleUserPress} style={styles.userContainer}>
                        {user ? (
                            <>
                                <Image source={require("../assets/img/avt-icon.png")} style={styles.icon} />
                                <Text style={styles.username}>{user.name}</Text>
                            </>
                        ) : (
                            <Icon name="user-alt" size={30} color="black" style={styles.icon} />
                        )}
                    </TouchableOpacity>
                    <View style={styles.naviconright}>
                        <TouchableOpacity onPress={() => navigation.navigate("PurchasedTicket")}>
                            <Image source={require("../assets/img/voucher-icon.png")} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleMenu}>
                            <Icon name="bars" size={30} color="green" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.navBar}>
                    {/* <TouchableOpacity onPress={() => setSelectedTab("Sắp Chiếu")} style={[selectedTab === "Sắp Chiếu" && styles.activeTab]}>
                        <Text style={[styles.navItem, selectedTab === "Sắp Chiếu" && styles.active]}>SẮP CHIẾU</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedTab("Đang Chiếu")}>
                        <Text style={[styles.navItem, selectedTab === "Đang Chiếu" && styles.active]}>ĐANG CHIẾU</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        style={[styles.tab, selectedTab === "Sắp Chiếu" && styles.activeTab]}
                        onPress={() => setSelectedTab("Sắp Chiếu")}
                    >
                        <Text style={[styles.navItem, selectedTab === "Sắp Chiếu" && styles.active]}>
                            Phim sắp xem
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, selectedTab === "Đang Chiếu" && styles.activeTab]}
                        onPress={() => setSelectedTab("Đang Chiếu")}
                    >
                        <Text style={[styles.navItem, selectedTab === "Đang Chiếu" && styles.active]}>
                            Phim đã xem
                        </Text>
                    </TouchableOpacity>
                </View>
                <TextInput style={styles.searchBar} placeholder="Tìm tên phim" placeholderTextColor="rgba(0, 0, 0, 0.5)" />



                <FlatList
                    data={selectedTab === "Đang Chiếu" ? movies : upcomingMovies}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    ListHeaderComponent={() => (
                        <Image source={require("../assets/img/banner.png")} style={styles.banner}></Image>
                    )}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('MovieDetail', { movie: item })}
                            style={styles.movieItem}>
                            <Image source={{ uri: item.image }} style={styles.movieImage} />
                            <Text style={styles.movieTitle}>{item.title}</Text>
                            <Text style={styles.movieDuration}>{item.duration}</Text>
                        </TouchableOpacity>
                    )}
                />
                {menuVisible && (
                    <Animated.View style={[styles.menuContainer, { right: slideAnim }]}>

                        <TouchableOpacity style={styles.menuItem}>
                            <Icon name="bell" size={24} color="gray" />
                            <Text style={styles.menuText}>Thông báo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={handleUserPress}>
                            <Icon name="user" size={24} color="gray" />
                            <Text style={styles.menuText}>Tài khoản</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("PurchasedTicket")} >
                            <Icon name="ticket-alt" size={24} color="gray" />
                            <Text style={styles.menuText}>Vé</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Icon name="cog" size={24} color="gray" />
                            <Text style={styles.menuText}>Cài đặt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                            <Icon name="sign-out-alt" size={24} color="red" />
                            <Text style={[styles.menuText, { color: "red" }]}>Đăng xuất</Text>

                        </TouchableOpacity>
                    </Animated.View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        backgroundColor: '#F6F6F6',
        justifyContent: "center",
        width: "100%",
    },
    header: {
        width: "100%",
        fontSize: 20, fontWeight: 'bold',
        fontFamily: "Roboto",
    },
    navBar: {
        flexDirection: 'row', justifyContent: 'space-around',
        backgroundColor: "#FFFFFF",
        width: "100%",
        fontFamily: "Roboto",
    },
    navItem: {
        fontSize: 16, color: '#888',
        padding: 10,
        paddingVertical: 20,
        fontFamily: "Roboto",
    },
    active: {
        color: 'green', fontWeight: 'bold',
        fontFamily: "Roboto",



    },
    tab: {

        width: "50%",
        borderBottomWidth: 2,
        borderBottomColor: "transparent",

        justifyContent: "center",
        alignItems: "center"
    },
    activeTab: {
        borderBottomColor: "#28a745",

    },
    searchBar: {
        backgroundColor: '#FFFFFF', padding: 10, borderRadius: 20,
        width: "90%",
        margin: 20,
    },
    banner: {
        width: "95%",
        marginHorizontal: "auto",
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginBottom: 20
    },
    movieItem: {
        flex: 1, alignItems: 'center', margin: 5,
    },
    movieImage: { width: 100, height: 150, borderRadius: 8, resizeMode: 'cover' },
    movieTitle: {
        fontSize: 14, fontWeight: 'bold', textAlign: 'center',
        fontFamily: "Roboto",
    },
    movieDuration: { fontSize: 12, color: '#666', fontFamily: "Roboto", },
    navicon: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#CFCFCF"
    },
    naviconright: {
        flexDirection: "row",
    },
    userContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    username: {
        color: "green",
        fontSize: 15,
        fontFamily: "Roboto",
    },
    icon: {
        width: 30,
        height: 30,
        margin: 10
    },
    menuContainer: {
        position: "absolute",
        top: 0,
        right: 0,

        flex: 1,
        height: " 100%",
        backgroundColor: "rgba(255,255,255,.9)", // Lớp nền mờ
        paddingTop: 50,
        paddingHorizontal: 20,
        zIndex: 100,
        paddingLeft: "10%"

    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
    },
    menuText: {
        color: "gray",
        fontSize: 18,
        marginLeft: 15,
        fontFamily: "Roboto",
    },
    closeMenu: {

    }
});

export default HomeScreen;
