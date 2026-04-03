import React from "react";
import { View, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import {
  BeVietnamPro_400Regular,
  BeVietnamPro_500Medium,
  BeVietnamPro_600SemiBold,
  BeVietnamPro_700Bold,
} from "@expo-google-fonts/be-vietnam-pro";

import { CartProvider } from "./src/context/CartContext";
import { COLORS } from "./src/config/theme";
import HomeScreen from "./src/screens/HomeScreen";
import CartScreen from "./src/screens/CartScreen";
import OrderSummaryScreen from "./src/screens/OrderSummaryScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "PlusJakartaSans-Regular": PlusJakartaSans_400Regular,
    "PlusJakartaSans-Medium": PlusJakartaSans_500Medium,
    "PlusJakartaSans-SemiBold": PlusJakartaSans_600SemiBold,
    "PlusJakartaSans-Bold": PlusJakartaSans_700Bold,
    "PlusJakartaSans-ExtraBold": PlusJakartaSans_800ExtraBold,
    "BeVietnamPro-Regular": BeVietnamPro_400Regular,
    "BeVietnamPro-Medium": BeVietnamPro_500Medium,
    "BeVietnamPro-SemiBold": BeVietnamPro_600SemiBold,
    "BeVietnamPro-Bold": BeVietnamPro_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.background,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <CartProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            contentStyle: { backgroundColor: COLORS.background },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
