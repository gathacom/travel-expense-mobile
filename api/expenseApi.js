import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ipAddress = "192.168.78.201";

export const totalExpenses = async (callback) => {
    const token = await AsyncStorage.getItem("token");
    await axios
    .get(`http://${ipAddress}:3000/expenses/total`, { headers: { Authorization: `Bearer ${token}` } })
    .then(async (res) => {
      await callback(true, res);
    })
    .catch((err) => {
      callback(true, err);
    });
}
export const totalExpensesByTrip = async (tripId, callback) => {
    const token = await AsyncStorage.getItem("token");
    await axios
    .get(`http://${ipAddress}:3000/expenses/total/${tripId}`, data, { headers: { Authorization: `Bearer ${token}` } })
    .then(async (res) => {
      await callback(true, res);
    })
    .catch((err) => {
      callback(true, err);
    });
}
export const addExpense = async (data, callback) => {
    const token = await AsyncStorage.getItem("token");
    await axios
    .post(`http://${ipAddress}:3000/expense`, data, { headers: { Authorization: `Bearer ${token}` } })
    .then(async (res) => {
      await callback(true, res);
    })
    .catch((err) => {
      callback(true, err);
    });
}
export const expenseById = async (tripId,expenseId, callback) => {
    const token = await AsyncStorage.getItem("token");
    await axios
    .get(`http://${ipAddress}:3000/expense/${tripId}/${expenseId}`,{ headers: { Authorization: `Bearer ${token}` } })
    .then(async (res) => {
      await callback(true, res);
    })
    .catch((err) => {
      callback(true, err);
    });
}
export const editExpense = async (tripId, expenseId, data, callback) => {
    const token = await AsyncStorage.getItem("token");
    await axios
    .put(`http://${ipAddress}:3000/expense/${tripId}/${expenseId}`, data, { headers: { Authorization: `Bearer ${token}` } })
    .then(async (res) => {
      await callback(true, res);
    })
    .catch((err) => {
      callback(true, err);
    });
}

export const destroyExpense = async (tripId,expenseId, callback) => {
    const token = await AsyncStorage.getItem("token");
    await axios
    .delete(`http://${ipAddress}:3000/expense/${tripId}/${expenseId}`, { headers: { Authorization: `Bearer ${token}` } })
    .then(async (res) => {
      await callback(true, res);
      console.log("res ", res);
    })
    .catch((err) => {
      callback(true, err);
    });
}