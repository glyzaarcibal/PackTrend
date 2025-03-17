import React, { useState } from "react";
import { 
    Image, 
    View, 
    StyleSheet, 
    Text, 
    ScrollView, 
    Pressable 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContext"; // Import global theme state

const SingleProduct = (props) => {
    const { isDarkMode } = useTheme(); // Use global theme state
    const [item, setItem] = useState(props.route.params.item);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigation = useNavigation();

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
            {/* Back Button & Favorite */}
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color={isDarkMode ? "white" : "black"} />
                </Pressable>
                <Pressable onPress={toggleFavorite}>
                    <MaterialIcons 
                        name={isFavorite ? "favorite" : "favorite-border"} 
                        size={24} 
                        color={isFavorite ? "red" : isDarkMode ? "white" : "black"} 
                    />
                </Pressable>
            </View>

            {/* Product Image */}
            <Image 
                source={{ uri: item.image ? item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' }}
                resizeMode="contain"
                style={styles.image}
            />

            {/* Product Info */}
            <View style={styles.contentContainer}>
                <Text style={[styles.productName, isDarkMode && styles.darkText]}>{item.name}</Text>
                <Text style={[styles.productSub, isDarkMode && styles.darkSubText]}>Wallet with chain</Text>
                <Text style={[styles.productStyle, isDarkMode && styles.darkSubText]}>Style #{item.id}</Text>

                <Text style={styles.price}>${item.price}</Text>

                {/* Buttons */}
                <Pressable style={[styles.buyButton, isDarkMode && styles.darkBuyButton]}>
                    <Text style={[styles.buyText, isDarkMode && styles.darkBuyText]}>BUY NOW</Text>
                </Pressable>
                <Pressable style={[styles.cartButton, isDarkMode && styles.darkCartButton]}>
                    <Text style={[styles.cartText, isDarkMode && styles.darkCartText]}>ADD TO CART</Text>
                </Pressable>

                {/* Tabs */}
                <View style={styles.tabsContainer}>
                    <Text style={[styles.tab, styles.activeTab, isDarkMode && styles.darkActiveTab]}>Description</Text>
                    <Text style={[styles.tab, isDarkMode && styles.darkTab]}>Shopping info</Text>
                    <Text style={[styles.tab, isDarkMode && styles.darkTab]}>Payment options</Text>
                </View>

                {/* Description */}
                <Text style={[styles.description, isDarkMode && styles.darkText]}>
                    {item.description}
                </Text>

                {/* Material & Care */}
                <Text style={[styles.subHeader, isDarkMode && styles.darkText]}>Material & care</Text>
                <Text style={[styles.materialCare, isDarkMode && styles.darkSubText]}>
                    All products are made with carefully selected materials. 
                    Please handle with care for longer product life. - Protect 
                    from direct light, heat, and rain. Should it become wet, 
                    dry it immediately with a soft cloth - Store in the provided 
                    flannel bag or box - Clean with a soft, dry cloth.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    darkContainer: {
        backgroundColor: "#121212",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    image: {
        width: "100%",
        height: 250,
        marginBottom: 20,
    },
    contentContainer: {
        alignItems: "center",
    },
    productName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#121212",
        textAlign: "center",
    },
    darkText: {
        color: "white",
    },
    productSub: {
        fontSize: 16,
        color: "#666666",
        textAlign: "center",
    },
    darkSubText: {
        color: "#AAAAAA",
    },
    productStyle: {
        fontSize: 12,
        color: "#999999",
        marginBottom: 10,
        textAlign: "center",
    },
    price: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ff7e5f",
        marginVertical: 10,
    },
    buyButton: {
        backgroundColor: "#000000",
        paddingVertical: 10,
        width: "100%",
        alignItems: "center",
        borderRadius: 5,
        marginVertical: 5,
    },
    darkBuyButton: {
        backgroundColor: "#ffffff",
    },
    buyText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    darkBuyText: {
        color: "#121212",
    },
    cartButton: {
        backgroundColor: "#F5F5F5",
        paddingVertical: 10,
        width: "100%",
        alignItems: "center",
        borderRadius: 5,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: "#000000",
    },
    darkCartButton: {
        backgroundColor: "#222222",
        borderColor: "white",
    },
    cartText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#121212",
    },
    darkCartText: {
        color: "white",
    },
    tabsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },
    darkTab: {
        color: "#888888",
    },
    tab: {
        fontSize: 14,
        color: "#666666",
        paddingBottom: 5,
    },
    activeTab: {
        color: "#121212",
        borderBottomWidth: 2,
        borderBottomColor: "black",
    },
    darkActiveTab: {
        color: "white",
        borderBottomColor: "white",
    },
    description: {
        color: "#444444",
        fontSize: 14,
        textAlign: "left",
        marginVertical: 10,
    },
    subHeader: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#121212",
        marginTop: 15,
    },
    materialCare: {
        color: "#666666",
        fontSize: 14,
        textAlign: "left",
        marginTop: 5,
    },
});

export default SingleProduct;
