import axios from "axios";

const ipAddress = "192.168.78.201";

export const signUp = async (data, callback) => {
    await axios
    .post(`http://${ipAddress}:3000/signup`, data)
    .then(async (res) => {
      await callback(true, res);
    })
    .catch((err) => {
      callback(true, err);
    });
}
export const signIn = async (data, callback) => {
    await axios
    .post(`http://${ipAddress}:3000/signin`, data)
    .then(async (res) => {
      await callback(true, res);
    })
    .catch((err) => {
      callback(true, err.message);
    });
}