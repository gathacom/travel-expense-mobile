import { StyleSheet, Text, View, Modal, TextInput, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Elements/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { editTrip, tripById } from "../../api/tripApi";
import { COLORS } from "../../constants/theme";

const EditTripForm = ({ visible, onClose, tripId, onEditTrip }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    try {
      tripById(tripId, (success, response) => {
        if (response.status === 200) {
          console.log();
          setTitle(response.data.trip.title);
          setDescription(response.data.trip.description);
        } else {
          Alert.alert("Error", "Failed to fetch trip data");
        }
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }, [tripId]);

  const handleSubmit = async () => {
    editTrip(tripId, { title, description }, (status, res) => {
      if (status){
        if (res.status === 200) {
          Alert.alert('Success', 'Trip edit successfully');
          onClose();
          onEditTrip();
        } else {
          Alert.alert('Error', 'Failed to edit trip');
        }
      }
  }) 
};

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Edit Trip</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          multiline={true}
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <Button title="Submit" onPress={handleSubmit} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default EditTripForm;
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
    width: "100%",
    paddingHorizontal: 8,
  },
});
