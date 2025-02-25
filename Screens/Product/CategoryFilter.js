import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, Text } from 'react-native';
import { Badge } from 'react-native-paper';

const CategoryFilter = (props) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
            <View style={styles.container}>
                {/* "All" Category */}
                <TouchableOpacity
                    key="all"
                    onPress={() => {
                        props.categoryFilter('all');
                        props.setActive(-1);
                    }}
                    style={[styles.categoryItem, props.active === -1 && styles.activeCategory]}
                >
                    <Text style={[styles.categoryText, props.active === -1 && styles.activeText]}>All</Text>
                </TouchableOpacity>

                {/* Dynamic Categories */}
                {props.categories.map((item, index) => (
                    <TouchableOpacity
                        key={item._id.$oid}
                        onPress={() => {
                            props.categoryFilter(item._id.$oid);
                            props.setActive(index);
                        }}
                        style={[styles.categoryItem, props.active === index && styles.activeCategory]}
                    >
                        <Text style={[styles.categoryText, props.active === index && styles.activeText]}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#ffffff',
        paddingVertical: 10,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    categoryItem: {
        backgroundColor: '#e0e0e0', // Default color
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20, // Rounded Pills
        marginHorizontal: 5,
    },
    activeCategory: {
        backgroundColor: '#ff6f61', // Active color
    },
    categoryText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
    },
    activeText: {
        color: '#fff', // White text for active
    },
});

export default CategoryFilter;
