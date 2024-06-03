import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import SignInPage from "./screens/SignInPage";
import SignUpPage from "./screens/SignUpPage";
import HomePage from "./screens/HomePage";
import SplashScreen from "./screens/SplashScreen";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogoutButton from "./components/Elements/LogoutButton";
import TripDetailPage from "./screens/TripDetailPage";
import CreateTripPage from "./screens/CreateTripPage";
import ExpenseDetailPage from "./screens/ExpenseDetailPage";
import ProfilePage from "./screens/ProfilePage";
import { COLORS } from "./constants/theme";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="TripDetailPage" component={TripDetailPage} />
      <Stack.Screen name="CreateTripPage" component={CreateTripPage} />
      <Stack.Screen name="ExpenseDetailPage" component={ExpenseDetailPage} />
      <Stack.Screen
        name="SignInPage"
        component={SignInPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

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
        {isLoggedIn ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarActiveTintColor: "#03aec6",
              tabBarInactiveTintColor: "#01294d",
              tabBarStyle: {
                display: "flex",
              },
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Profile") {
                  iconName = focused ? "person" : "person-outline";
                }

                return <Icon name={iconName} size={size} color={color} />;
              },
              headerRight: () => <LogoutButton />,
              headerBackVisible: false,
            })}
          >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Profile" component={ProfilePage} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{
                headerShown: false,
              }}
            />
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
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <Toast />
    </>
  );
}