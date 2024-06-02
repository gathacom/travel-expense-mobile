import React from "react";
import { Pressable, StyleSheet, Text, View, SafeAreaView } from "react-native";

import SignUpForm from "../components/Fragments/SignUpForm";
import { COLORS } from "../constants/theme";
const SignUpPage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <SignUpForm navigation={navigation}></SignUpForm>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ textAlign: "center", fontSize:14 }}>Already have account? </Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("SignInPage")}
        >
          <Text style={styles.button}>Sign In</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignUpPage;

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
