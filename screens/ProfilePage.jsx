import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/profile.jpeg")}
        style={styles.profileImage}
      />
      <Text style={styles.text}>Nama: Yoga Agatha Pasaribu</Text>
      <Text style={styles.text}>NIM: 123210025</Text>
      <Text style={styles.text}>Hobi: Basket dan Main game</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ProfilePage;
