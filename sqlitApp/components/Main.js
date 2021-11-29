import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import MyButton from "./MyButton";

import Database from './Database';

function Main({ navigation }) {
    useEffect(() => {
        Database.createTable()
    }, [])

    const goTo = () => {
        navigation.navigate("alarmList")
    }

    return (
        <View style={styles.container}>
            <MyButton name="Sqlite App" styless={styles.text} funkcja={goTo} /><Text style={styles.smText}>Show gallery pictures Take picture from camera Save photo to device Delete photo from device Share picture</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#673AB7"
    },
    text: {
        color: "white",
        fontSize: 25
    },
    smText: {
        textAlign: "center",
        color: "white",
        fontSize: 18
    },
});

export default Main;