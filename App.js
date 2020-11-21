import React from "react";
import "react-native-gesture-handler";
import {
  Platform,  
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigator from "./navigation/Navigator"
// import RootStackScreen from "./src/screens/RootStackScreen.js";
// import CameraScreen from "./src/screen/CameraScreen.js";
import ImagePicker from "./src/components/ImagePicker";

const Stack = createStackNavigator();

export default function App() {
  return ( 
        //<ImagePicker/>
            <Navigator/>
        
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});

