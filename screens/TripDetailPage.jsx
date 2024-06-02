import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../constants/theme";
import Button from "../components/Elements/Button";
import EditTripForm from "../components/Fragments/EditTripForm";
import { destroyTrip, tripById } from "../api/tripApi";
import { useNavigation } from "@react-navigation/native";
import CreateExpenseForm from "../components/Fragments/CreateExpenseForm";

const TripDetailPage = ({ route }) => {
  const { tripId } = route.params;
  const [trip, setTrip] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalExpenseVisible, setModalExpenseVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const navigation = useNavigation();

  const fetchTrip = async () => {
    try {
      await tripById(tripId, (success, response) => {
        if (response.status === 200) {
          setTrip(response.data.trip);
        }
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, [trip.id, fetchTrip]);

  const handleTripUpdated = () => {
    setModalVisible(false);
    fetchTrip();
  };
  const handleExpenseAdded = () => {
    setModalExpenseVisible(false);
    fetchTrip();
  };

  const handleDeleteTrip = async () => {
    setConfirmDeleteVisible(false);
    try {
      await destroyTrip(tripId || trip.id, (success, response) => {
        console.log(response);
        if (response.status === 200) {
          Alert.alert("Success", "Trip deleted successfully");
          navigation.navigate("HomePage");
        } else {
          Alert.alert("Errors", "Failed to delete trip");
        }
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to delete this trip?",
      [
        {
          text: "Batal",
          onPress: () => console.log("Batal"),
          style: "cancel",
        },
        { text: "Hapus", onPress: () => handleDeleteTrip() },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{trip.title}</Text>
        <Text style={styles.description}>{trip.description}</Text>
        <Text style={styles.date}>Created At: {trip.createdAt}</Text>
        <Text style={styles.date}>Updated At: {trip.updatedAt}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Edit Trip"
            width="45%"
            onPress={() => setModalVisible(true)}
          />
          <Button
            title="Delete Trip"
            width="45%"
            bgColor="danger"
            onPress={confirmDelete}
          />
        </View>
          <Button
            bgColor="secondary" 
            title="Add Expense"
            width="100%"
            onPress={() => setModalExpenseVisible(true)}
          />
        <Text style={styles.expenses}>Expenses:</Text>
        <FlatList
          data={trip.expenses}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.expenseContainer}
              onPress={() =>
                navigation.navigate("ExpenseDetailPage", {
                  tripId: tripId || trip.id,
                  expenseId: item.id,
                })
              }
            >
              <View>
                <Text style={styles.expenseTitle}>{item.title}</Text>
                <Text style={styles.expenseAmount}>Amount: {item.amount}</Text>
                <Text style={styles.expenseDescription}>
                  {item.description}
                </Text>
                <Text style={styles.expenseDate}>
                  Created At: {item.createdAt}
                </Text>
                <Text style={styles.expenseDate}>
                  Updated At: {item.updatedAt}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <EditTripForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        tripId={tripId || trip.id}
        onEditTrip={handleTripUpdated}
      />
      <CreateExpenseForm
        visible={modalExpenseVisible}
        onClose={() => setModalExpenseVisible(false)}
        tripId={tripId || trip.id}
        onAddExpense={handleExpenseAdded}
      />
    </>
  );
};

export default TripDetailPage;

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
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  expenseContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary,
  },
  expenses: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 8,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: COLORS.light,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  expenseTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  expenseAmount: {
    fontSize: 14,
    color: COLORS.primary,
    marginVertical: 4,
  },
  expenseDescription: {
    fontSize: 14,
    color: COLORS.secondary,
    marginBottom: 4,
  },
  expenseDate: {
    fontSize: 12,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

});
