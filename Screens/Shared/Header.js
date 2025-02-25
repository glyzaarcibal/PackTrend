import React from "react";
import { StyleSheet, Image, SafeAreaView, View, Text, Platform } from "react-native";

const Header = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{
                        uri: "https://static.vecteezy.com/system/resources/previews/007/636/978/non_2x/shopping-bag-logo-icon-design-template-free-vector.jpg",
                    }}
                    resizeMode="contain"
                    style={styles.logo}
                />
                <Text style={styles.title}>PackTrend</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#6200ea",
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        paddingTop: Platform.OS === "ios" ? 50 : 30, // Adjust top spacing for iOS & Android
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        height: 40,
        width: 40,
        marginRight: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
});

export default Header;
