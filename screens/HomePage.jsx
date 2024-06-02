import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput, Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "../constants/theme";
import React, { useState, useEffect } from "react";
import TotalExpense from "../components/Fragments/TotalExpense";
import Button from "../components/Elements/Button";
import TripList from "../components/Layouts/TripList";
import axios from 'axios';
import { addTrip } from "../api/tripApi";
import CreateTripForm from "../components/Fragments/CreateTripForm";

const Stack = createNativeStackNavigator();
function LogoTitle() {
  return (
    <Image
      style={styles.image}
      source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
    />
  );
}

const HomePage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <>
      <View style={styles.container}>
        
        <View
          style={{
            padding: 20,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <View style={{}}>
            <Text style={{ fontWeight: "bold", fontSize: 24, color: COLORS.primary, marginBottom: 10 }}>| Gathacom</Text>
            <Button title="Add New Trip" onPress={() => setModalVisible(true)} />
          </View>
          <TotalExpense totalExpense={1000000000} />
        </View>
        <TripList />
      </View>

      <CreateTripForm 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        // onAddTrip={handleAddTrip}
      />
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  image: {
    width: 50,
    height: 50,
  },
  modalView: {
    marginHorizontal: 20,
    marginTop: 155,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    gap: 10,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 2,
    borderRadius: 10,
    marginBottom: 12,
    width: '100%',
    paddingHorizontal: 8,
  },
});
