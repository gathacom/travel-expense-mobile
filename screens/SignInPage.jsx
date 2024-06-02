import { Pressable, StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import SignUpForm from "../components/Fragments/SignUpForm";
import { COLORS } from "../constants/theme";
import SignInForm from "../components/Fragments/SignInForm";
const SignInPage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <SignInForm navigation={navigation}></SignInForm>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ textAlign: "center", fontSize:14 }}>Don't have account? </Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("SignUpPage")}
        >
          <Text style={styles.button}>Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignInPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
    justifyContent: "center",
  },
  button: {
    color: COLORS.primary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
  },
});
