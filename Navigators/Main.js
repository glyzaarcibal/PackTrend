import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, useColorScheme } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";    
import ProductContainer from "../Screens/Product/ProductContainer";
import Header from "../Screens/Shared/Header";
import { useTheme } from 'react-native-paper';
import UserNavigator from "./UserNavigator";
import AdminNavigator from "./AdminNavigator";
import CartIcon from "../Screens/Shared/CartIcon";
import Icon from '@expo/vector-icons/FontAwesome'; // Import Icon component

const Tab = createBottomTabNavigator();

const Main = () => {
    const theme = useTheme(); // Get theme safely
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const [darkMode, setDarkMode] = useState(isDarkMode);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    if (!theme) {
      console.warn("Theme is undefined in Main"); // Debugging
      return null; // Prevent crashes
    }

    return (
        <View style={{ flex: 1, backgroundColor: darkMode ? "#121212" : "#fff" }}>

            <Tab.Navigator
            initialRouteName="Main"
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#e91e63'
            }}
             >
                
            <Tab.Screen
                name="Main"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => {
                        return <Icon
                            name="home"
                            style={{ position: "relative" }}
                            color={color}
                            size={30}
                        />
                    }
                }}
            />

            <Tab.Screen
                name="Cart"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({ color }) => {
                        return <>
                            <Icon
                                name="shopping-cart"
                                style={{ position: "relative" }}
                                color={color}
                                size={30}
                            />
                            <CartIcon />
                        </>
                    }
                }}
            />

            <Tab.Screen
                name="Admin"
                component={AdminNavigator}
                options={{
                    tabBarIcon: ({ color }) => {
                        return <Icon
                            name="cog"
                            style={{ position: "relative" }}
                            color={color}
                            size={30}
                        />
                    }
                }}
            />
            <Tab.Screen
                name="User"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({ color }) => {
                        return <Icon
                            name="user"
                            style={{ position: "relative" }}
                            color={color}
                            size={30}
                        />
                    }
                }}
            />
        </Tab.Navigator>
        </View>
    );
};

export default Main;