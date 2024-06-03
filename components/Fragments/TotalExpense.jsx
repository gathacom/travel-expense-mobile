import { StyleSheet, Text, TextInput, View, Input, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { COLORS } from "../../constants/theme";
import { totalExpenses } from "../../api/expenseApi";

const API_KEY = 'cur_live_qMHCbPI4lK83ZUKyMBJh2wVgMiYnDOpOMEfARTIU';

const curreciesData = [
  { label: "IDR", value: "IDR" },
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "JPY", value: "JPY" },
  { label: "GBP", value: "GBP" },
  { label: "AUD", value: "AUD" },
];

const TotalExpense = ({ totalExpense }) => {
  const [currency, setCurrency] = useState("IDR");
  const [convertedExpense, setConvertedExpense] = useState(totalExpense);

  useEffect(() => {
    const convertCurrency = async () => {
      try {
        const response = await axios.get(
          `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&base_currency=IDR&currencies=${currency}`
        );
        const rate = response.data.data[currency].value;
        setConvertedExpense(totalExpense * rate);
      } catch (error) {
        console.error("Error fetching currency data: ", error);
      }
    };
    if (currency !== "IDR") {
      convertCurrency();
    } else {
      setConvertedExpense(totalExpense);
    }
  }, [currency, totalExpense]);

  return (
    <View style={styles.container}>
    <Text style={{ fontSize:12, textAlign: "left" }}>Total Expense</Text>
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{convertedExpense.toFixed(2)}</Text>
      </View>
      <View style={styles.picker}>
        <Picker
          dropdownIconColor={COLORS.primary}
          mode="dropdown"
          selectedValue={currency}
          style={{width: 120 }}
          onValueChange={(itemValue, itemIndex) => setCurrency(itemValue)}
        >
          {curreciesData.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
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
