import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, Text, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
                    <ImageBackground 
                        source={{ uri: 'https://cdn0.onehowto.com/en/posts/9/5/1/all_the_different_types_of_bags_and_their_uses_7159_orig.jpg' }} 
                        style={styles.categoryImage} 
                        imageStyle={{ borderRadius: 10 }} 
                    >
                        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.overlay}>
                            <Text style={[styles.categoryText, props.active === -1 && styles.activeText]}>All</Text>
                        </LinearGradient>
                    </ImageBackground>
                </TouchableOpacity>

                {/* Dynamic Categories with Full-Size Images */}
                {props.categories.map((item, index) => (
                    <TouchableOpacity
                        key={item._id.$oid}
                        onPress={() => {
                            props.categoryFilter(item._id.$oid);
                            props.setActive(index);
                        }}
                        style={[styles.categoryItem, props.active === index && styles.activeCategory]}
                    >
                        <ImageBackground 
                            source={{ uri: item.image }} 
                            style={styles.categoryImage} 
                            imageStyle={{ borderRadius: 10 }}
                        >
                            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.overlay}>
                                <Text style={[styles.categoryText, props.active === index && styles.activeText]}>
                                    {item.name}
                                </Text>
                            </LinearGradient>
                        </ImageBackground>
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
        paddingHorizontal: 5,
    },
    categoryItem: {
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 6,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
        backgroundColor: '#f0f0f0',
        width: 100,  // Adjust width
        height: 100, // Adjust height
    },
    categoryImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    overlay: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 10,
        paddingBottom: 5,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    activeCategory: {
        borderWidth: 2,
        borderColor: '#ff7e5f',
    },
    activeText: {
        color: '#fff',
    },
});

export default CategoryFilter;
