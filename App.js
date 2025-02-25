import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Header from "./Screens/Shared/Header";
import ProductContainer from "./Screens/Product/ProductContainer";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./Navigators/Main";

export default function App() {
    return (
        <SafeAreaView style={styles.safeContainer}>
            <StatusBar style="light" />
            <NavigationContainer>
                <View style={styles.container}>
                    <Header />
                    <Main />
                </View>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#f5f5f5", // Light gray background
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
    },
});

