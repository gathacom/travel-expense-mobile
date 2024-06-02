import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Modal, Alert } from "react-native";
import Button from "../Elements/Button";
import { editExpense, expenseById } from "../../api/expenseApi";
import { COLORS } from "../../constants/theme";

const EditExpenseForm = ({ visible, onClose, tripId, expenseId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState();

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        await expenseById(tripId, expenseId, (success, response) => {
          if (response.status === 200) {
            console.log(response.data.expense.amount);
            setTitle(response.data.expense.title);
            setDescription(response.data.expense.description);
            setAmount(response.data.expense.amount);
          } else {
            Alert.alert("Error", "Failed to fetch expense data");
          }
        })
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    };
    fetchExpense();
  }, [tripId, expenseId]);

  const handleSubmit = async () => {
    try {
      const parsedAmount = parseFloat(amount);
      await editExpense(
        tripId,
        expenseId,
        {
          title,
          description,
          amount: parsedAmount,
        },
        (status, response) => {
          if (response.status === 200) {
            Alert.alert("Success", "Expense edited successfully");
            onClose();
          } else {
            Alert.alert("Error", "Failed to edit expense");
          }
        }
      );
    } catch (error) {
      Alert.alert("Error", error.message ,);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Edit Expense</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount ? amount.toString() : ""}
          onChangeText={setAmount}
        />
        <Text>{amount}</Text>
        <Button title="Submit" onPress={handleSubmit} />
        <Button title="Cancel" bgColor="danger" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    marginTop: 150,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
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

export default EditExpenseForm;
