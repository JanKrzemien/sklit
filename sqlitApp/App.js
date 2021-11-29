import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Main from "./components/Main";
import AlarmList from "./components/AlarmList";
import AddScreen from "./components/AddScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="alarmList"
          component={AlarmList}
          options={{
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#673AB7",
            },
            title: "lista budzików",
          }}
        />
        <Stack.Screen
          name="add"
          component={AddScreen}
          options={{
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#673AB7",
            },
            title: "dodaj budzik",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
