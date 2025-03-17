import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Surface, Text, Searchbar } from "react-native-paper";
import Banner from "../Shared/Banner";
import CategoryFilter from "./CategoryFilter";
import ProductList from "./ProductList";
import { useTheme } from "../../context/ThemeContext"; // Import ThemeContext

const data = require("../../assets/data/products.json");
const productCategories = require("../../assets/data/categories.json");

var { height } = Dimensions.get("window");

const ProductContainer = ({ navigation }) => {
    const { isDarkMode } = useTheme(); // Use global theme state

    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState(false);
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState([]);
    const [initialState, setInitialState] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        setProducts(data);
        setProductsFiltered(data);
        setFocus(false);
        setCategories(productCategories);
        setActive(-1);
        setInitialState(data);
        setProductsCtg(data);
    }, []);

    return (
        <Surface
            width="100%"
            style={[
                styles.container,
                { backgroundColor: isDarkMode ? "#121212" : "white" }, // Apply dark mode
            ]}
        >
            <View style={styles.searchContainer}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={(text) => [setKeyword(text), setFocus(true)]}
                    value={keyword}
                    onClearIconPress={() => setFocus(false)}
                    style={styles.searchBar}
                />
            </View>

            {focus ? (
                <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>Searching...</Text>
            ) : (
                <ScrollView>
                    <Banner />
                   
                    <View>
                        <Text style={[styles.title , { color: isDarkMode ? "#fff" : "#000" }]}>Shop by categories</Text>
                        <CategoryFilter categories={categories} active={active} setActive={setActive} categoryFilter={(id) => {
                            const filtered = id === 'all' ? initialState : initialState.filter(p => p.category.$oid === id);
                            setProductsCtg(filtered);
                        }} />
                        
                    </View>
                    <Text style={[styles.headerText, { color: isDarkMode ? "#fff" : "#000" }]}>Products</Text>

                    {productsCtg.length > 0 ? (
                        <View style={styles.listContainer}>
                            {productsCtg.map((item) => (
                                <ProductList key={item._id.$oid} item={item} />
                            ))}
                        </View>
                    ) : (
                        <View style={[styles.center, { height: height / 2 }]}>
                            <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>No products found</Text>
                        </View>
                    )}
                </ScrollView>
            )}
        </Surface>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        marginVertical: 10,
        marginLeft: 10,
        textAlign: "center",
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "left",
        marginVertical: 10,
        marginLeft: 10,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "98%",
        marginVertical: 10,
    },
    searchBar: {
        flex: 1,
        marginRight: 10,
        borderRadius: 8,
        height: 40,
    },
    listContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",

    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ProductContainer;