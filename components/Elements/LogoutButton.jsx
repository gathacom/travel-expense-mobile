import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LogoutButton = ({}) => {
  const navigation = useNavigation();
    const handleSignOut = async () => {
        await AsyncStorage.removeItem("token");
        navigation.navigate("SignInPage");
      }
      const styles = StyleSheet.create({
        button: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 7,
          paddingHorizontal: 24,
          borderRadius: 4,
          elevation: 3,
          backgroundColor: COLORS["primary"],
        },
        text: {
          fontSize: 12,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          color: 'white',
        },
      });
      return (
        <Pressable style={styles.button} onPress={handleSignOut}>
          <Text style={styles.text}>SignOut</Text>
        </Pressable>
      );
}

export default LogoutButton

const styles = StyleSheet.create({})