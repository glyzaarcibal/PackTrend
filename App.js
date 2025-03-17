import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from "react-redux";
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';
import Toast from "react-native-toast-message";
import { ThemeProvider } from './context/ThemeContext';

import Header from './Screens/Shared/Header';
import DrawerNavigator from './Navigators/DrawerNavigator';
import store from './Redux/store';
import Auth from './context/Store/Auth';
import Main from './Navigators/Main';

export default function App() {
  const colorScheme = useColorScheme(); // Detects system theme
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme; // Set theme

  return (
    <Auth>
      <Provider store={store}>
        <ThemeProvider> {/* ✅ Wrap the entire app inside ThemeProvider */}
          <PaperProvider theme={theme}>  
            <NavigationContainer>
              
              {/* ✅ DrawerNavigator should include Main inside it */}
              <DrawerNavigator /> 
              {/* ❌ REMOVE <Main /> from here */}
              <Toast />
            </NavigationContainer>
          </PaperProvider>
        </ThemeProvider>
      </Provider>
    </Auth>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },  
});
