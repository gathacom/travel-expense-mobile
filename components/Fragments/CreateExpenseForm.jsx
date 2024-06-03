import { StyleSheet, Text, View, Modal, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../constants/theme";
import Button from "../Elements/Button";
import { addExpense } from "../../api/expenseApi";
const CreateExpenseForm = ({ visible, onClose, onAddTrip ,tripId}) => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState();

  const handleAddExpense = async () => {
    const parsedAmount = parseFloat(amount);
    addExpense({ title, description, amount: parsedAmount, tripId }, (status, res) => {
      if (status){
        if (res.status === 200) {
          Alert.alert('Success', 'Expense added successfully');
          onClose();
          setTitle('');
          setDescription('');
          setAmount('');
        } else {
          Alert.alert('Error', 'Failed to add expense');
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
          <Text style={styles.modalText}>Add New Expense</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
          />
          <Button title="Submit" onPress={handleAddExpense}  />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </Modal>
  );
};

export default CreateExpenseForm;

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
