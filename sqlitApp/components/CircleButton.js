import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const CircleButton = ({ ikona, size, funkcja }) => {
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={() => {
        funkcja();
      }}
    >
      <Icon name={ikona} size={size} color="#3a3a3a" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 50,
    marginBottom: 20,
    backgroundColor: "#e91e63",
    position: "absolute",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    left: "50%",
    transform: [{ translateX: -50 }]
  },
});

export default CircleButton;
