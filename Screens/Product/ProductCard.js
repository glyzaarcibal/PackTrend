import React, { useState } from "react";
import { StyleSheet, Button,View, Dimensions, ImageBackground, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext"; // Adjust the import based on your project setup
import { addToCart } from '../../Redux/Actions/cartActions'
 import { useSelector, useDispatch } from 'react-redux'
 import Toast from 'react-native-toast-message'

var { width } = Dimensions.get("window");

const ProductCard = (props) => {
    const { name, price, image } = props;
    const { isDarkMode } = useTheme(); // Use global theme state
    const [isFavorite, setIsFavorite] = useState(false);
    const dispatch = useDispatch()
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? "#1c1c1e" : "white" }]}>
            {/* Image as Background */}
            <ImageBackground
                style={styles.image}
                source={{ uri: image || "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png" }}
                imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
            >
                {/* Favorite Button */}
                <Pressable onPress={toggleFavorite} style={styles.favoriteButton}>
                    <MaterialIcons
                        name={isFavorite ? "favorite" : "favorite-border"}
                        size={24}
                        color={isFavorite ? "red" : isDarkMode ? "white" : "black"}
                    />
                </Pressable>
            </ImageBackground>

            {/* Product Info */}
            <View style={styles.textContainer}>
                <Text style={[styles.title, { color: isDarkMode ? "white" : "#333" }]}>
                    {name.length > 15 ? name.substring(0, 12) + "..." : name}
                </Text>
                <Text style={styles.price}>${price}</Text>
                <Button 
                     title={'Add'} 
                     color={'green'}  
                     onPress={() => {
                             dispatch(addToCart({ ...props, quantity: 1, })),
                                 Toast.show({
                                     topOffset: 60,
                                     type: "success",
                                     text1: `${name} added to Cart`,
                                     text2: "Go to your cart to complete order"
                                 })
                         }}> 
                         </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 50,
        borderRadius: 10,
        margin: 10,
        overflow: "hidden", // Ensures the image stays within the rounded corners
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 6,
        marginLeft: 30,
    },
    image: {
        width: "100%",
        height: width / 2 - 50, // Full top half of the card
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: 10,
    },
    favoriteButton: {
        position: "absolute",
        right: 10,
        top: 10,
    },
    textContainer: {
        padding: 10,
        alignItems: "flex-start",
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ff7e5f",
        marginTop: 5,
    },
});

export default ProductCard;
