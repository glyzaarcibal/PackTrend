import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Surface, Text, Avatar, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import debounce from 'lodash.debounce';

const { width } = Dimensions.get("window");

const SearchedProduct = ({ searchQuery }) => {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        debouncedFilterProducts();
    }, [searchQuery, products]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch("YOUR_API_ENDPOINT");
            const data = await response.json();
            console.log("Fetched Products:", data);
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const filterProducts = () => {
        if (!searchQuery) {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    const debouncedFilterProducts = useCallback(debounce(filterProducts, 300), [searchQuery, products]);

    return (
        <View style={{ width }}>
            {loading ? (
                <ActivityIndicator size="large" color="#6200EE" style={styles.center} />
            ) : filteredProducts.length > 0 ? (
                <FlatList 
                    data={filteredProducts}
                    keyExtractor={(item) => item._id?.toString() || Math.random().toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <TouchableOpacity
                                style={styles.touchable}
                                onPress={() => navigation.navigate("Product Detail", { item })}
                            >
                                <Surface style={styles.surface}>
                                    <Avatar.Image 
                                        size={50} 
                                        source={{ uri: item.image || 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' }} 
                                    />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text variant="labelMedium">{item.name}</Text>
                                        <Text variant="bodyMedium">{item.description}</Text>
                                        <Divider />
                                        <Text variant="titleMedium">${item.price}</Text>
                                    </View>
                                </Surface>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            ) : (
                <View style={styles.center}>
                    <Text style={{ alignSelf: 'center' }}>
                        No products match the selected criteria
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
    itemContainer: {
        width: '100%',
        padding: 10,
    },
    touchable: {
        width: '100%',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    surface: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        elevation: 2,
        borderRadius: 5,
    }
});

export default SearchedProduct;