import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(async () => {
            const token = await AsyncStorage.getItem("token")
            if (token) {
                navigation.navigate("HomePage")
            } else {
                navigation.navigate("SignInPage")
            }
            setLoading(false);
        }, 3000)
    },[navigation])

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>SplashScreen</Text>
            ) : (
                null
            )}
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})