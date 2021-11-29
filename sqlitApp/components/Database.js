import React from "react";
import { Text, View } from "react-native";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("krzemien_jan_4ia1.db");

class Database {
  static createTable() {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS alarmy (id integer primary key not null, time text, dzwonek text, pon text, wt text, sr text, czw text, pt text, sob text, nd text);"
      );
    });
  }

  static addAlarm(time, dzwonek, pon, wt, sr, czw, pt, sob, nd) {
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO alarmy (time, dzwonek, pon, wt, sr, czw, pt, sob, nd) VALUES('" +
            time +
            "', '" +
            dzwonek +
            "', '" +
            pon +
            "', '" +
            wt +
            "', '" +
            sr +
            "', '" +
            czw +
            "', '" +
            pt +
            "', '" +
            sob +
            "', '" +
            nd +
            "');",
          [],
          (tx, results) => {
            resolve(JSON.stringify(results));
          },
          function (tx, error) {
            reject(error);
          }
        );
      })
    );
  }

  static getAll() {
    var query = "SELECT * FROM alarmy";

    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          query,
          [],
          (tx, results) => {
            resolve(JSON.stringify(results.rows._array));
          },
          function (tx, error) {
            reject(error);
          }
        );
      })
    );
  }

  static update(id, col, newVal) {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE alarmy SET " + col + "='" + newVal + "' WHERE id=" + id + ";"
      );
    });
  }

  static remove(id) {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM alarmy WHERE (id = " + id + ");");
    });
  }

  static removeAll() {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM alarmy");
    });
  }
}

export default Database;
