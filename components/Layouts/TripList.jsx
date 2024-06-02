import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../../constants/theme";
import TripItem from "../Fragments/TripItem";
import { tripsByAuthor } from "../../api/tripApi";

const TripList = () => {
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    tripsByAuthor((status, res) => {
      if (status) {
        setTrips(res.data.trips);
      }
    })
  }, [trips])
  return (
    // <></>
    <View style={styles.container}>
      <Text style={styles.title}>Trip List</Text>
      <FlatList 
        data={trips}
        keyExtractor={(item) => item.title}
        renderItem={({item}) => <TripItem trip={item}/>}
      />
    </View>
  );
};

export default TripList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    backgroundColor: COLORS.light,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
