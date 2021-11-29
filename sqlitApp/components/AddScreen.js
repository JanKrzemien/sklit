import React from "react";
import { Text, View, StyleSheet } from "react-native";

import CircleButton from "./CircleButton";
import Database from "./Database";

const AddScreen = ({ route, navigation }) => {
  const addAlarm = () => {
    Database.addAlarm("00:00", "f", "f", "f", "f", "f", "f", "f", "f").then(
      (all) => {
        console.log(JSON.parse(all));
        let temp = JSON.parse(all);
        route.params.add(
          temp.insertId,
          "00:00",
          "f",
          "f",
          "f",
          "f",
          "f",
          "f",
          "f",
          "f"
        );
      }
    );

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CircleButton ikona="plus" size={55} funkcja={addAlarm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#512DA8",
  },
});

export default AddScreen;
