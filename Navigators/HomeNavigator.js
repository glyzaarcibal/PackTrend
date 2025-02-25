import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import ProductContainer from "../Screens/Product/ProductContainer";
import SingleProduct from '../Screens/Product/SingleProduct';
import Cart from '../Screens/Cart/Cart';
const Stack = createStackNavigator()
function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Products'
                component={ProductContainer}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='Product Detail'
                component={SingleProduct}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='Cart'
                component={Cart}
                options={{
                    headerShown: false,
                }}
                />
        </Stack.Navigator>
    )
}
export default function HomeNavigator() {
    return <MyStack />;
}