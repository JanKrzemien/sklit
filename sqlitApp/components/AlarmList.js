import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, LogBox } from "react-native";

import CircleButton from "./CircleButton";
import Alarm from "./Alarm";
import Database from "./Database";

const AlarmList = ({ navigation }) => {
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);
  const [alarmy, setAlarmy] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    Database.getAll().then((all) => {
      console.log(JSON.parse(all));
      setAlarmy(JSON.parse(all));
    });
  }, []);

  const addAlarm = (id, time, dzwonek, pon, wt, sr, czw, pt, sob, nd) => {
    let temp = alarmy;
    temp.push({
      id: id,
      time: time,
      dzwonek: dzwonek,
      pon: pon,
      wt: wt,
      sr: sr,
      czw: czw,
      pt: pt,
      sob: sob,
      nd: nd,
    });
    console.log("powinno być", temp);
    setAlarmy(temp);
    setRefresh(!refresh);
  };

  const goTo = () => {
    navigation.navigate("add", { add: addAlarm });
  };
  const removeAlarm = (id) => {
    Database.remove(id);
    let temp = alarmy.filter((x) => x.id != id);
    setAlarmy(temp);
    setRefresh(!refresh);
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={alarmy}
        extraData={refresh}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <Alarm data={item} remove={removeAlarm} />}
      />
      <CircleButton ikona="plus" size={55} funkcja={goTo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#512DA8",
  },
});

export default AlarmList;
