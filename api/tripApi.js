import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ipAddress = "192.168.78.201";

export const addTrip = async (data, callback) => {
    const token = await AsyncStorage.getItem("token");
    await axios
    .post(`http://${ipAddress}:3000/trip`, data, { headers: { Authorization: `Bearer ${token}` } })
    .then(async (res) => {
      await callback(true, res);
    })
    .catch((err) => {
      callback(true, err);
    });
}
export const tripsByAuthor = async (callback) => {
    const token = await AsyncStorage.getItem("token");
    await axios
    .get(`http://${ipAddress}:3000/tripsByAuthor`,{ headers: { Authorization: `Bearer ${token}` } })
    .then(async (res) => {
      await callback(true, res);
    })
    .catch((err) => {
      callback(true, err);
    });
}
export const tripById = async (tripId, callback) => {
    const token = await AsyncStorage.getItem("token");
    await axios
    .get(`http://${ipAddress}:3000/trip/${tripId}`,{ headers: { Authorization: `Bearer ${token}` } })
    .then(async (res) => {
      await callback(true, res);
    })
    .catch((err) => {
      callback(true, err);
    });
}
export const editTrip = async (tripId, data, callback) => {
    const token = await AsyncStorage.getItem("token");
    await axios
    .patch(`http://${ipAddress}:3000/trip/${tripId}`,data, { headers: { Authorization: `Bearer ${token}` } })
    .then(async (res) => {
      await callback(true, res);
    })
    .catch((err) => {
      callback(true, err);
    });
}

export const destroyTrip = async (tripId, callback) => {
    const token = await AsyncStorage.getItem("token");
    await axios
    .delete(`http://${ipAddress}:3000/trip/${tripId}`, { headers: { Authorization: `Bearer ${token}` } })
    .then(async (res) => {
      await callback(true, res);
      console.log("res ", res);
    })
    .catch((err) => {
      callback(true, err);
    });
}