import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  AsyncStorage,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import { Video } from "expo-av";
import tracker from "../api/tracker";

const LandingScreen = ({ navigation }) => {
  const { colors } = useTheme();
  let [user, setUser] = useState();
  let data;

  useEffect(() => {
    (async () => {
      const userId = await AsyncStorage.getItem("UserId");
      if (userId) {
        tracker
        .get(`/user/${userId}`)
        .then((res) => {
          console.log(res.data);
         
          navigation.navigate("Root");
        })
        .catch(async (err) => {
            await AsyncStorage.clear();
            navigation.navigate("Login");
          console.log(err);
        });
       
      }
    })();
  });
  // useEffect(() => {
  //     axios.get('http://localhost:3000/User')
  //     .then((response) => {
  //         setUser(response.data);
  //         console.log(setUser());
  //         data= response.data;
  //         console.log("i'm heare ye stack",data)

  //       });

  // }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.video}>
        <Video
          source={require("../../assets/background/videoBackground.mp4")}
          style={styles.backgroundVideo}
          rate={1}
          shouldPlay={true}
          isLooping={true}
          volume={1}
          muted={true}
          resizeMode="cover"
        />
      </View>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="50000"
          source={require("../../assets/LogoImage/VIC.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
        animation="fadeInUpBig"
      >
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}
        >
          Stay connected with everyone!
        </Text>
        <Text style={styles.text}>Sign in with account</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <LinearGradient
              colors={["#189ad3", "#71c7ec"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default LandingScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#189ad3",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
  backgroundVideo: {
    position: "absolute",
    width: 500,
    height: 420,
  },
});
