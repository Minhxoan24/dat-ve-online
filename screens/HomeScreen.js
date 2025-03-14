import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage";


const HomeScreen = ({ navigation }) => {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Lấy thông tin đăng nhập từ AsyncStorage
        const fetchUser = async () => {
            const storedUser = await AsyncStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        };
        fetchUser();
    }, []);

    const handleUserPress = () => {
        console.log(user)
        if (user) {
            navigation.navigate("Account");
        } else {
            navigation.navigate("Login");
        }
    };

    useEffect(() => {
        axios.get('https://67d07fbb825945773eb11f01.mockapi.io/api/signup/movies')
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error('Lỗi khi lấy dữ liệu:', error);
            });
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
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
                    <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                        <Icon name="bars" size={30} color="green" style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.navBar}>
                <TouchableOpacity><Text style={styles.navItem}>SẮP CHIẾU</Text></TouchableOpacity>
                <TouchableOpacity><Text style={[styles.navItem, styles.active]}>ĐANG CHIẾU</Text></TouchableOpacity>
                <TouchableOpacity><Text style={styles.navItem}>SUẤT CHIẾU SỚM</Text></TouchableOpacity>
            </View>
            <TextInput style={styles.searchBar} placeholder="Tìm tên phim" placeholderTextColor="rgba(0, 0, 0, 0.5)" />
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id}
                numColumns={3}
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
        </View>
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
    },
    navBar: {
        flexDirection: 'row', justifyContent: 'space-around',
        backgroundColor: "#FFFFFF",
        width: "100%"
    },
    navItem: {
        fontSize: 16, color: '#888',
        padding: 10,
        paddingVertical: 20,
    },
    active: { color: 'green', fontWeight: 'bold' },
    searchBar: {
        backgroundColor: '#FFFFFF', padding: 10, borderRadius: 20,
        width: "90%",
        margin: 20,
    },
    movieItem: {
        flex: 1, alignItems: 'center', margin: 5,
    },
    movieImage: { width: 100, height: 150, borderRadius: 8, resizeMode: 'cover' }, // Cập nhật kích thước ảnh
    movieTitle: { fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
    movieDuration: { fontSize: 12, color: '#666' },
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

        fontSize: 15
    },
    icon: {
        width: 30,
        height: 30,
        margin: 10
    },
});

export default HomeScreen;
