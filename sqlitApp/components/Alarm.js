import React, { useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Switch,
  Animated,
  FlatList,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import Database from "./Database";
import Dzien from "./Dzien";

const Alarm = ({ data, remove }) => {
  const [dniTyg, setDniTyg] = useState([
    { dzien: "pon", set: data.pon == "f" ? false : true },
    { dzien: "wt", set: data.wt == "f" ? false : true },
    { dzien: "sr", set: data.sr == "f" ? false : true },
    { dzien: "czw", set: data.czw == "f" ? false : true },
    { dzien: "pt", set: data.pt == "f" ? false : true },
    { dzien: "sob", set: data.sob == "f" ? false : true },
    { dzien: "nd", set: data.nd == "f" ? false : true },
  ]);
  const [switchVal, setSwitchVal] = useState(
    data.dzwonek == "f" ? false : true
  );
  const [isAnimeOpen, setAnimeOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const fadeAnimTop = useRef(new Animated.Value(0)).current;
  const moveDownAnim = useRef(new Animated.Value(0)).current;
  const fadeAnimDown = useRef(new Animated.Value(1)).current;

  const show = () => {
    Animated.timing(fadeAnimTop, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(moveDownAnim, {
      toValue: 35,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnimDown, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const hide = () => {
    Animated.timing(fadeAnimTop, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(moveDownAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnimDown, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleSwitch = () => {
    Database.update(data.id, "dzwonek", switchVal == false ? "t" : "f");
    setSwitchVal(!switchVal);
  };
  const handleDelete = () => {
    remove(data.id);
  };
  const handleAnimation = () => {
    if (isAnimeOpen == false) {
      show();
    } else {
      hide();
    }

    setAnimeOpen(!isAnimeOpen);
  };
  const statusChange = (dzien) => {
    let temp = dniTyg;
    let val;
    temp.forEach((x) => {
      if (x.dzien == dzien) {
        val = !x.set;
        x.set = !x.set;
      }
    });

    Database.update(data.id, dzien, val == false ? "f" : "t");
    setDniTyg(temp);
    setRefresh(!refresh);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.time}>{data.time}</Text>
        </View>
        <View style={styles.cell}>
          <Switch value={Boolean(switchVal)} onValueChange={handleSwitch} />
        </View>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.cell} onPress={handleDelete}>
          <Icon name="trash" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cell} onPress={handleAnimation}>
          <Icon
            name={isAnimeOpen ? "chevron-up" : "chevron-down"}
            size={25}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <Animated.View
        pointerEvents={isAnimeOpen == true ? "auto" : "none"}
        style={[
          styles.dniTygodnia,
          {
            opacity: fadeAnimTop,
            transform: [{ translateY: moveDownAnim }],
          },
        ]}
      >
        <FlatList
          listKey={(item, index) => index}
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          data={dniTyg}
          extraData={refresh}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <Dzien
              dzien={item.dzien}
              status={item.set}
              zmienStatus={statusChange}
            />
          )}
        />
      </Animated.View>
      <Animated.View style={[styles.zaznaczone, { opacity: fadeAnimDown }]}>
        <FlatList
          listKey={(item, index) => index}
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          data={dniTyg}
          extraData={refresh}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <Text
              style={[
                styles.dni,
                { display: item.set == true ? "flex" : "none" },
              ]}
            >
              {item.dzien}
            </Text>
          )}
        />
      </Animated.View>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
          marginTop: "20%",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "10%",
    marginRight: "10%",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cell: {
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  time: {
    color: "white",
    fontSize: 35,
  },
  zaznaczone: {
    width: "100%",
    height: 40,
    position: "absolute",
    bottom: 3,
  },
  dni: {
    marginLeft: 6,
    color: "white",
    fontSize: 20,
  },
  dniTygodnia: {
    width: "100%",
    height: 40,
    position: "absolute",
    zIndex: 1000,
    bottom: 38,
  },
});

export default Alarm;
