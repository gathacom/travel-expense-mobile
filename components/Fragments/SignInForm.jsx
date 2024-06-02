import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";
import Button from "../Elements/Button";
import { COLORS } from "../../constants/theme";
import { signIn } from "../../api/authApi";


export default SignInForm = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState(null);
  
    const showToast = () => {
      Toast.show({
        type: 'error',
        text1: 'Failed',
        text2: 'Email or Password is incorrect',
      });
    }
    
    const handleSignIn = async () => {
      const data = {
        email: email,
        password: password
      }
      signIn(data, async (status, res) => {
        try {
          if(res.status == 200) {
            AsyncStorage.setItem("token", res.data.token);
            navigation.replace("HomePage");
            console.log(res.data.token);
            console.log(res);
          }else{
            console.log("ahh",res);
          }
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
      })
    };
  
    const clearErrors = () => {
      setEmailError("");
      setPasswordError("");
      setError(null);
    }
  
    return (
      <>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign <Text style={{color: COLORS.primary }}>In .</Text></Text>
        {error && <Text style={styles.error}>{error}</Text>}
        <TextInput
          style={[styles.input]}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {setEmail(text); clearErrors()}}
          onBlur={clearErrors}
        />
        {emailError && <Text style={styles.error}>{emailError}</Text>}
        <TextInput
          style={[styles.input]}
          placeholder="Password"
          value={password}
          onChangeText={(text) => {setPassword(text); clearErrors()}}
          onBlur={clearErrors}
          secureTextEntry
        />
        {passwordError && <Text style={styles.error}>{passwordError}</Text>}
        <Button title="Sign In" onPress={handleSignIn}/>
      </View>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fdfdfd",
      alignItems: "center",
      justifyContent: "center",
    },
    formContainer: {
      padding: 24,
      display: "flex",
    },
    title: {
      fontSize: 36,
      fontWeight: "bold",
      marginBottom: 20,
    },
    input: {
      fontSize: 16,
      height: 40,
      marginBottom: 18,
      paddingHorizontal: 10,
      borderBottomWidth: 2,
      borderBottomColor: "#03aec6",
      backgroundColor: COLORS.light,
      borderRadius: 10,
    },
    error: {
      color: "red",
    }
  });
  

