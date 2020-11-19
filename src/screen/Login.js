import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SocialIcon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userName: "",
      phoneNumb: 0,
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            backgroundColor: "#189ad3",
            flex: 1,
            padding:20,
            justifyContent: "space-around",
          }}
        >
          <View style={styles.inputs}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Email..."
                placeholderTextColor="#003f5c"
                onChangeText={(text) => this.setState({ email: text })}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Password..."
                placeholderTextColor="#003f5c"
                onChangeText={(text) =>
                  this.setState({ password: secureTextEntry })
                }
              />
            </View>
          


          <TouchableOpacity style={{ marginBottom: 20}}>
            <Text style={styles.forgot}>If you Forgot Your Password Click Hear!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.loginText}>Signup</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "column" }}>
            <SocialIcon
              type="facebook"
              onPress={() => {
                alert("facebook");
              }}
            />
            <Text style={{ textAlign: "center" }}>facebook</Text>
          </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around'
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 50,
    margin: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputs: {
    padding:5,
    alignItems: "center",
   
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgot: {
    color: "white",
    fontSize: 11,
    //flexDirection:"row",
    //alignContent:"flex-end",
    textAlign:"right",
    
  },
  loginBtn: {
    
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    //marginTop: 40,
    //marginBottom: 10,
  },
});
