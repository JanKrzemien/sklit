import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

function MyButton({ name, funkcja, styless, widthh }) {
  return (
    <View style={widthh}>
      <TouchableOpacity
        onPress={() => {
          funkcja();
        }}
      >
        <Text style={styless != undefined ? styless : styles.btnText}>
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

MyButton.propTypes = {
  name: PropTypes.string.isRequired,
  funkcja: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flexWrap: "wrap",
  },
});

export default MyButton;
