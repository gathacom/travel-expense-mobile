import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Button from "../components/Elements/Button";
import { COLORS } from "../constants/theme";
import { expenseById, destroyExpense } from "../api/expenseApi";
import { useNavigation } from "@react-navigation/native";
import EditExpenseForm from "../components/Fragments/EditExpenseForm";

const ExpenseDetailPage = ({ route }) => {
  const { tripId, expenseId } = route.params;
  const [expense, setExpense] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const fetchExpense = async () => {
    try {
      await expenseById(tripId, expenseId, (success, response) => {
        if (response.status === 200) {
          setExpense(response.data.expense);
        } else {
          Alert.alert("Error", "Failed to fetch expense data");
        }
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    console.log(error);

    }
  };

  useEffect(() => {
    fetchExpense();
  }, [tripId, expenseId, fetchExpense]);

  const handleEditExpense = () => {
    navigation.navigate("EditExpenseForm", {
      tripId: tripId,
      expenseId: expenseId,
    });
  };

  const handleDeleteExpense = async () => {
    try {
      await destroyExpense(
        tripId,
        expenseId,
        (success, response) => {
          if (response.status === 200) {
            Alert.alert("Success", "Expense deleted successfully");
            navigation.goBack();
          } else {
            Alert.alert("Error", "Failed to delete expense");
          }
        }
      );
    } catch (error) {
      Alert.alert("Error", error.message);
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{expense.title}</Text>
        <Text style={styles.description}>{expense.description}</Text>
        <Text style={styles.amount}>Amount: {expense.amount}</Text>
        <Text style={styles.date}>Created At: {expense.createdAt}</Text>
        <Text style={styles.date}>Updated At: {expense.updatedAt}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Edit Expense"
            onPress={() => setModalVisible(true)}
            width="45%"
          />
          <Button
            title="Delete Expense"
            bgColor="danger"
            width="45%"
            onPress={handleDeleteExpense}
          />
        </View>
        
      </View>
      <EditExpenseForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        tripId={tripId}
        expenseId={expenseId}
        onEditExpense={handleEditExpense}
      />
    </>
  );
};

export default ExpenseDetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.light,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});
