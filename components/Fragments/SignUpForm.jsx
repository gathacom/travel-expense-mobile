import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View} from "react-native";
import Toast from "react-native-toast-message";
import Button from "../Elements/Button";
import { COLORS } from "../../constants/theme";
import { signUp } from "../../api/authApi";


export default SignUpForm = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState(null);
  
    const showToast = () => {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Sign Up Successful',
      });
    }
    
    const handleSignUp = async () => {
      const data = {
        email: email,
        username: username,
        password: password
      }
      signUp(data, async (status, res) => {
        try {
          if (status && res?.response?.data) {
            const { type, message } = res.response.data;
            if (type === "email") {
              setEmailError(message);
              setUsernameError("");
              setPasswordError("");
            } else if (type === "username") {
              setUsernameError(message);
              setEmailError("");
              setPasswordError("");
            } else if (type === "password") {
              setPasswordError(message);
              setEmailError("");
              setUsernameError("");
            } else {
              setEmailError("");
              setUsernameError("");
              setPasswordError("");
            }
          } else if (status && res?.data.isCreated) {
            showToast();
            navigation.navigate('SignInPage');
          }
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
      })
    };
  
    const clearErrors = () => {
      setEmailError("");
      setUsernameError("");
      setPasswordError("");
      setError(null);
    }
  
    return (
      <>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign <Text style={{color: COLORS.primary }}>Up .</Text></Text>
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
          placeholder="Username"
          value={username}
          onChangeText={(text) => {setUsername(text); clearErrors()}}
          onBlur={clearErrors}
        />
        {usernameError && <Text style={styles.error}>{usernameError}</Text>}
        <TextInput
          style={[styles.input]}
          placeholder="Password"
          value={password}
          onChangeText={(text) => {setPassword(text); clearErrors()}}
          onBlur={clearErrors}
          secureTextEntry
        />
        {passwordError && <Text style={styles.error}>{passwordError}</Text>}
        <Button title="Sign Up" onPress={handleSignUp} />
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
    },
    title: {
      fontSize: 36,
      fontWeight: "bold",
      marginBottom: 20,
    },
    input: {
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
  

