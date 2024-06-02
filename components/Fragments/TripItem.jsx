import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";

const TripItem = ({ trip }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("TripDetailPage", { tripId : trip.id })}
    >
      <Text style={styles.title}>{trip.title}</Text>
      <Text style={styles.description}>{trip.description}</Text>
      <Text style={styles.date}>Created At: {trip.createdAt}</Text>
      <Text style={styles.date}>Updated At: {trip.updatedAt}</Text>
      <Text style={styles.expenses}>Expenses: {trip.expenses.length}</Text>
    </TouchableOpacity>
  );
};

export default TripItem;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  expenses: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});
