import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Surface, Text, Searchbar } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import ProductList from './ProductList';
import Banner from "../Shared/Banner";
import SearchedProduct from "./SearchedProduct";
import CategoryFilter from "./CategoryFilter";

const data = require('../../assets/data/products.json');
const productCategories = require('../../assets/data/categories.json');

var { height, width } = Dimensions.get('window');

const ProductContainer = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState(false);
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState([]);
    const [initialState, setInitialState] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [keyword, setKeyword] = useState('');

    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        );
    };

    const onBlur = () => {
        setFocus(false);
        setKeyword('');
    };

    const changeCtg = (ctg) => {
        ctg === "all"
            ? [setProductsCtg(initialState), setActive(true)]
            : [
                setProductsCtg(
                    products.filter((i) => i.category.$oid === ctg),
                    setActive(true)
                ),
            ];
    };

    useEffect(() => {
        setProducts(data);
        setProductsFiltered(data);
        setFocus(false);
        setCategories(productCategories);
        setActive(-1);
        setInitialState(data);
        setProductsCtg(data);

        return () => {
            setProducts([]);
            setProductsFiltered([]);
            setCategories([]);
            setActive();
            setInitialState();
        };
    }, []);

    return (
        <Surface width="100%" style={{ flex: 1, alignItems: 'center',backgroundColor: "#6200ea", justifyContent: 'center' }}>
            {/* Search Bar with Cart Icon */}
            <View style={styles.searchContainer}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={(text) => [searchProduct(text), setKeyword(text), setFocus(true)]}
                    value={keyword}
                    onClearIconPress={onBlur}
                    style={styles.searchBar}
                />
                {/* Shopping Cart Icon */}
                <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                    <Ionicons name="cart" size={30} color="white" style={styles.cartIcon} />
                </TouchableOpacity>
            </View>

            {focus ? (
                <SearchedProduct productsFiltered={productsFiltered} />
            ) : (
                <ScrollView>
                    <View>
                        <Banner />
                    </View>
                    <View>
                        <CategoryFilter
                            categories={categories}
                            categoryFilter={changeCtg}
                            productsCtg={productsCtg}
                            active={active}
                            setActive={setActive}
                        />
                    </View>
                    {productsCtg.length > 0 ? (
                        <View style={styles.listContainer}>
                            {productsCtg.map((item) => (
                                <ProductList key={item._id.$oid} item={item} />
                            ))}
                        </View>
                    ) : (
                        <View style={[styles.center, { height: height / 2 }]}>
                            <Text>No products found</Text>
                        </View>
                    )}
                </ScrollView>
            )}
        </Surface>
    );
};

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "98%",
        marginVertical: 10,
    },
    searchBar: {
        flex: 1,
        marginRight: 10,
    },
    cartIcon: {
        padding: 10,
    },
    listContainer: {
        height: height,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductContainer;
