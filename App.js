import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInPage from "./screens/SignInPage";
import SignUpPage from "./screens/SignUpPage";
import HomePage from "./screens/HomePage";
import SplashScreen from "./screens/SplashScreen";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogoutButton from "./components/Elements/LogoutButton";
import { BackHandler } from "react-native";
import TripDetailPage from "./screens/TripDetailPage";
import CreateTripPage from "./screens/CreateTripPage";
import ExpenseDetailPage from "./screens/ExpenseDetailPage";
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkToken();
  }, []);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="HomePage"
                component={HomePage}
                options=
                {{ 
                    headerRight: () => <LogoutButton />, 
                    headerBackVisible: false
                  }}
              />
              <Stack.Screen
                name="TripDetailPage"
                component={TripDetailPage}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="CreateTripPage"
                component={CreateTripPage}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="ExpenseDetailPage"
                component={ExpenseDetailPage}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="SignInPage"
                component={SignInPage}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="SignInPage"
                component={SignInPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUpPage"
                component={SignUpPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="HomePage"
                component={HomePage}
                options={{ headerShown: true, headerTitle: "Home" }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
