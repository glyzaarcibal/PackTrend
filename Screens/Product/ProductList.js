import React from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";
import ProductCard from "./ProductCard";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContext"; // Import ThemeContext

var { width } = Dimensions.get("window");

const ProductList = ({ item }) => {
    const navigation = useNavigation();
    const { isDarkMode } = useTheme(); // Get dark mode state

    return (
        <TouchableOpacity
            style={{ width: "50%" }}
            onPress={() => navigation.navigate("Product Detail", { item: item })}
        >
            <View
                style={{
                    width: width / 2,
                    backgroundColor: isDarkMode ? "#121212" : "#FFFFFF", // Apply dark mode
                }}
            >
                <ProductCard {...item} />
            </View>
        </TouchableOpacity>
    );
};

export default ProductList;
