// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './context/CartContext';
import MenuScreen from './screens/MenuScreen';
import DetailScreen from './screens/DetailScreen';
import CartScreen from './screens/CartScreen';
import ConfirmScreen from './screens/ConfirmScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen
            name="Confirm"
            component={ConfirmScreen}
            options={{ gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}