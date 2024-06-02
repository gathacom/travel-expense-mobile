import { StyleSheet, Text, TextInput, View, Input } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { COLORS } from "../../constants/theme";

const TotalExpense = ({ totalExpense }) => {
  const [currency, setCurrency] = useState("");

  return (
    <View style={styles.container}>
    <Text style={{ fontSize:12, textAlign: "left" }}>Total Expense</Text>
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{totalExpense}</Text>
      </View>
      <View style={styles.picker}>
        <Picker
          dropdownIconColor={COLORS.primary}
          mode="dropdown"
          selectedValue={currency}
          style={{width: 120 }}
          onValueChange={(itemValue, itemIndex) => setCurrency(itemValue)}
        >
          <Picker.Item label="IDR" value="IDR" />
          <Picker.Item label="USD" value="USD" />
        </Picker>
      </View>
    </View>
  );
};

export default TotalExpense;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: COLORS.light,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  picker: { justifyContent: "center", alignItems: "center" },
});
