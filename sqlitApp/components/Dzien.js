import React, { useState } from "react";
import { Text, View, TouchableNativeFeedback } from "react-native";

const Dzien = ({ dzien, status, zmienStatus }) => {
  const [stat, setStat] = useState(status);

  const handleClick = () => {
    setStat(!stat);

    zmienStatus(dzien);
  };

  return (
    <TouchableNativeFeedback onPress={handleClick}>
      <View
        style={{
          backgroundColor: stat == true ? "black" : "transparent",
          marginLeft: 6,
          padding: 6,
          borderRadius: 60,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
          }}
        >
          {dzien}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Dzien;
