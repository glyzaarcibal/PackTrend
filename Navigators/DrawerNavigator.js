import * as React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { Drawer } from "react-native-paper";
import { useTheme } from "../context/ThemeContext"; // Import ThemeContext
import Main from "./Main";
import DrawerContent from "../Screens/Shared/DrawerContent";

const NativeDrawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Get theme state and toggle function

  return (
    <NativeDrawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: "50%",
          backgroundColor: isDarkMode ? "#121212" : "#fff", // Apply dark mode
        },
        drawerLabelStyle: {
          color: isDarkMode ? "#fff" : "#000", // Text color in drawer
        },
        headerStyle: {
          backgroundColor: isDarkMode ? "#121212" : "#fff", // Apply dark mode to header
        },
        headerTintColor: isDarkMode ? "#fff" : "#000", // Change text/icon color in header
      }}
      drawerContent={() => (
        <View style={[styles.drawerContent, { backgroundColor: isDarkMode ? "#121212" : "#fff" }]}>
          <DrawerContent />
          
          {/* Dark Mode Toggle Button */}
          <Pressable onPress={toggleTheme} style={{ alignSelf: "flex-end", padding: 10 }}>
                <Text className="dark:text-stone-50">
                    <MaterialIcons name="dark-mode" size={30} color={isDarkMode ? "#BB86FC" : "#000"} />
                </Text>
            </Pressable>
        </View>
      )}
    >
      <NativeDrawer.Screen
        name="PackTrend"
        component={Main}
        options={{
          headerRight: () => (
            <Pressable onPress={toggleTheme} style={{ marginRight: 15 }}>
              <MaterialIcons
                name="dark-mode"
                size={30}
                color={isDarkMode ? "#fff" : "#000"}
              />
            </Pressable>
          ),
        }}
      />
    </NativeDrawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingVertical: 20,
  },
  toggleButton: {
    padding: 16,
    alignSelf: "center",
  },
});

export default DrawerNavigator;
